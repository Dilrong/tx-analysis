export interface AllNftInfoResponse {
  access: {
    owner: string;
    approvals: any[];
  };
  info: {
    token_url: string;
    extension: {
      image: string;
      image_data: string;
      external_url: string;
      description: string;
      name: string;
      attributes: any[];
      background_color: string;
      animation_url: string;
      youtube_url: string;
    };
  };
}
