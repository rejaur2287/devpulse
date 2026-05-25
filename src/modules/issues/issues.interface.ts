export interface IIssues {
  title: string;
  description: string;
  reporter_id: number;
  type: "bug" | " request";
  status: "open" | "in_progress" | "resolved";
  role?: string;
}
