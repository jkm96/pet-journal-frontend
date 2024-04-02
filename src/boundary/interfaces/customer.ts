
export type CustomerFeedbackRequest = {
  email:string;
  rating:number;
  feedback: string;
}

export type CustomerFeedbackResponse = {
  id:number;
  email:string;
  rating:number;
  feedback: string;
  createdAt: string;
  updatedAt: string;
}