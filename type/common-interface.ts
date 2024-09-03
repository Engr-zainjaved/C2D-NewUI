export interface IDeployProjectPayload {
  existing_repo: boolean;
  repository_name?: string;
  github_repo_name?: string;
  hosting_location: string;
  odoo_version: number;
}

export interface ICreateBranch {
  base_branch: number;
  name: string;
  stage: number;
}

export interface ICommit {
  identifier: string;
  provider_url: string;
  message: string;
}

export interface IBuild {
  id: number;
  status: string;
  url: string;
  error_message: string;
  is_active: boolean;
}

export interface IProjectItem {
  id: number;
  pusher_avatar_url: string;
  pusher_name: string;
  pusher_url: string;
  tracking_type: string;
  source_stage: string | null;
  target_stage: string | null;
  backup_datetime_utc: string | null;
  dump_name: string;
  build: IBuild | null;
  date_created: string;
  commits: ICommit[];
  additional_title: string;
  additional_message: string;
}
