export interface InterestRequestData {
  id: string;
  user_name: string;
  user_email: string;
  user_phone: string;
  user_country_code: string;
  property: {
    id: string;
    title: string;
    subType2: string;
    mls_id: string;
  };
  national_id: string;
  status_localized: string;
  status: string;
  source: string;
  created_at: string;
}
