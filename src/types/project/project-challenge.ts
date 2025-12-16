export interface ProjectChallenge {
  id?: string;
  project_id: string;
  challenge_type: string;
  description?: string;
  mitigation_strategy?: string;
  created_at?: Date;
  updated_at?: Date;
}
