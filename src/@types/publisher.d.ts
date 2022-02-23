interface IPublisher {
  id: number;
  name: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
}

interface IPublisherPayload {
  name: string;
  description?: string;
}
