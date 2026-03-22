// ============================================================
// GitHub API — ダッシュボード用リアルタイムデータ取得
// ============================================================

const GITHUB_TOKEN = process.env.GITHUB_TOKEN ?? "";
const OWNER = "RyotaTokuda";

// プロジェクトID → リポジトリ名マッピング
// mankai-services 内のアプリは repo:"mankai-services", subdir で区別
interface RepoMapping {
  repo: string;
  subdir?: string; // monorepo 内のサブディレクトリ
}

const PROJECT_REPOS: Record<string, RepoMapping> = {
  "web-media-engine": { repo: "web-media-engine" },
  "note-writer": { repo: "note-writer" },
  "parking-reader": { repo: "mankai-services", subdir: "apps/parking-reader" },
  shimedoki: { repo: "mankai-services", subdir: "apps/shimedoki" },
  "done-log": { repo: "mankai-services", subdir: "apps/done-log" },
  "file-converter": { repo: "mankai-services", subdir: "apps/file-converter" },
  "car-cost-sim": { repo: "mankai-services", subdir: "apps/car-cost-simulator" },
  "itami-techo": { repo: "mankai-services", subdir: "apps/itami-techo" },
  "home-stock": { repo: "mankai-services", subdir: "apps/home-stock" },
};

// 全対象リポジトリ（重複なし）
const ALL_REPOS = [...new Set(Object.values(PROJECT_REPOS).map((r) => r.repo))];

// ------------------------------------------------------------
// 型定義
// ------------------------------------------------------------

export interface GitHubIssue {
  number: number;
  title: string;
  body: string | null;
  html_url: string;
  labels: { name: string; color: string }[];
  state: string;
  created_at: string;
  updated_at: string;
  repo: string;
  priority: "critical" | "high" | "medium" | "low";
  projectId: string | null; // マッチしたプロジェクトID
}

export interface CIStatus {
  repo: string;
  workflowName: string;
  status: "healthy" | "warning" | "error" | "unknown";
  conclusion: string | null;
  updatedAt: string;
  url: string;
}

export interface PRInfo {
  number: number;
  title: string;
  html_url: string;
  state: string;
  draft: boolean;
  repo: string;
  head: string;
  created_at: string;
  updated_at: string;
  checksStatus: "success" | "failure" | "pending" | "unknown";
}

export interface RepoActivity {
  repo: string;
  lastPush: string | null;
  openPRs: number;
  openIssues: number;
}

export interface LiveDashboardData {
  issues: GitHubIssue[];
  ciStatuses: CIStatus[];
  prs: PRInfo[];
  repoActivities: RepoActivity[];
  fetchedAt: string;
}

// ------------------------------------------------------------
// API ヘルパー
// ------------------------------------------------------------

async function ghFetch<T>(path: string): Promise<T | null> {
  if (!GITHUB_TOKEN) return null;
  try {
    const res = await fetch(`https://api.github.com${path}`, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
      next: { revalidate: 300 }, // 5分キャッシュ
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

// ラベル名から優先度を判定
function labelToPriority(labels: { name: string }[]): "critical" | "high" | "medium" | "low" {
  const names = labels.map((l) => l.name.toLowerCase());
  if (names.some((n) => n.includes("critical") || n.includes("p0"))) return "critical";
  if (names.some((n) => n.includes("high") || n.includes("p1"))) return "high";
  if (names.some((n) => n.includes("medium") || n.includes("p2"))) return "medium";
  return "low";
}

// issue のラベルやタイトルからプロジェクトIDを推定
function issueToProjectId(issue: { title: string; labels: { name: string }[] }, repo: string): string | null {
  const text = (issue.title + " " + issue.labels.map((l) => l.name).join(" ")).toLowerCase();

  // repo 自体が独立リポジトリの場合
  for (const [pid, mapping] of Object.entries(PROJECT_REPOS)) {
    if (mapping.repo === repo && !mapping.subdir) return pid;
  }

  // monorepo (mankai-services) の場合はラベルやタイトルから推定
  for (const [pid, mapping] of Object.entries(PROJECT_REPOS)) {
    if (mapping.repo !== repo || !mapping.subdir) continue;
    const appName = mapping.subdir.replace("apps/", "");
    if (text.includes(appName) || text.includes(pid)) return pid;
  }

  return null;
}

// CI conclusion → health status
function conclusionToHealth(conclusion: string | null): "healthy" | "warning" | "error" | "unknown" {
  if (!conclusion) return "unknown";
  if (conclusion === "success") return "healthy";
  if (conclusion === "failure") return "error";
  return "warning"; // cancelled, skipped, etc.
}

// ------------------------------------------------------------
// データ取得
// ------------------------------------------------------------

async function fetchIssues(): Promise<GitHubIssue[]> {
  const results: GitHubIssue[] = [];
  for (const repo of ALL_REPOS) {
    const issues = await ghFetch<Array<{
      number: number;
      title: string;
      body: string | null;
      html_url: string;
      labels: { name: string; color: string }[];
      state: string;
      created_at: string;
      updated_at: string;
      pull_request?: unknown;
    }>>(`/repos/${OWNER}/${repo}/issues?state=open&per_page=50&sort=updated`);
    if (!issues) continue;
    for (const i of issues) {
      if (i.pull_request) continue; // PRを除外
      results.push({
        number: i.number,
        title: i.title,
        body: i.body,
        html_url: i.html_url,
        labels: i.labels,
        state: i.state,
        created_at: i.created_at,
        updated_at: i.updated_at,
        repo,
        priority: labelToPriority(i.labels),
        projectId: issueToProjectId(i, repo),
      });
    }
  }
  // 優先度順
  const order = { critical: 0, high: 1, medium: 2, low: 3 };
  results.sort((a, b) => order[a.priority] - order[b.priority]);
  return results;
}

async function fetchCIStatuses(): Promise<CIStatus[]> {
  const results: CIStatus[] = [];
  for (const repo of ALL_REPOS) {
    const workflows = await ghFetch<{ workflows: Array<{ id: number; name: string }> }>(
      `/repos/${OWNER}/${repo}/actions/workflows`
    );
    if (!workflows?.workflows) continue;
    for (const wf of workflows.workflows) {
      const runs = await ghFetch<{ workflow_runs: Array<{ conclusion: string | null; updated_at: string; html_url: string; status: string }> }>(
        `/repos/${OWNER}/${repo}/actions/workflows/${wf.id}/runs?per_page=1`
      );
      const latest = runs?.workflow_runs?.[0];
      results.push({
        repo,
        workflowName: wf.name,
        status: latest ? conclusionToHealth(latest.conclusion) : "unknown",
        conclusion: latest?.conclusion ?? null,
        updatedAt: latest?.updated_at ?? "",
        url: latest?.html_url ?? `https://github.com/${OWNER}/${repo}/actions`,
      });
    }
  }
  return results;
}

async function fetchPRs(): Promise<PRInfo[]> {
  const results: PRInfo[] = [];
  for (const repo of ALL_REPOS) {
    const prs = await ghFetch<Array<{
      number: number;
      title: string;
      html_url: string;
      state: string;
      draft: boolean;
      head: { ref: string };
      created_at: string;
      updated_at: string;
    }>>(`/repos/${OWNER}/${repo}/pulls?state=open&per_page=20`);
    if (!prs) continue;
    for (const pr of prs) {
      // PR checks status
      const checks = await ghFetch<{ check_runs: Array<{ conclusion: string | null }> }>(
        `/repos/${OWNER}/${repo}/commits/${pr.head.ref}/check-runs?per_page=50`
      );
      let checksStatus: PRInfo["checksStatus"] = "unknown";
      if (checks?.check_runs && checks.check_runs.length > 0) {
        const hasFailure = checks.check_runs.some((c) => c.conclusion === "failure");
        const allSuccess = checks.check_runs.every((c) => c.conclusion === "success");
        const hasPending = checks.check_runs.some((c) => c.conclusion === null);
        if (hasFailure) checksStatus = "failure";
        else if (allSuccess) checksStatus = "success";
        else if (hasPending) checksStatus = "pending";
      }
      results.push({
        number: pr.number,
        title: pr.title,
        html_url: pr.html_url,
        state: pr.state,
        draft: pr.draft,
        repo,
        head: pr.head.ref,
        created_at: pr.created_at,
        updated_at: pr.updated_at,
        checksStatus,
      });
    }
  }
  return results;
}

async function fetchRepoActivities(): Promise<RepoActivity[]> {
  const results: RepoActivity[] = [];
  for (const repo of ALL_REPOS) {
    const repoData = await ghFetch<{ pushed_at: string; open_issues_count: number }>(
      `/repos/${OWNER}/${repo}`
    );
    const prs = await ghFetch<Array<unknown>>(
      `/repos/${OWNER}/${repo}/pulls?state=open&per_page=1`
    );
    results.push({
      repo,
      lastPush: repoData?.pushed_at ?? null,
      openPRs: prs?.length ?? 0,
      openIssues: repoData?.open_issues_count ?? 0,
    });
  }
  return results;
}

// ------------------------------------------------------------
// メインエクスポート
// ------------------------------------------------------------

export async function fetchLiveDashboardData(): Promise<LiveDashboardData> {
  const [issues, ciStatuses, prs, repoActivities] = await Promise.all([
    fetchIssues(),
    fetchCIStatuses(),
    fetchPRs(),
    fetchRepoActivities(),
  ]);

  return {
    issues,
    ciStatuses,
    prs,
    repoActivities,
    fetchedAt: new Date().toISOString(),
  };
}

// プロジェクトIDに対応するリポジトリ名を取得
export function getRepoForProject(projectId: string): string | null {
  return PROJECT_REPOS[projectId]?.repo ?? null;
}

// プロジェクトIDに対応するCI statusを取得
export function getCIForProject(projectId: string, ciStatuses: CIStatus[]): CIStatus[] {
  const mapping = PROJECT_REPOS[projectId];
  if (!mapping) return [];
  return ciStatuses.filter((ci) => ci.repo === mapping.repo);
}

// プロジェクトIDに対応するissuesを取得
export function getIssuesForProject(projectId: string, issues: GitHubIssue[]): GitHubIssue[] {
  return issues.filter((i) => i.projectId === projectId);
}
