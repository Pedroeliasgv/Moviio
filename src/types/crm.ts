export interface KPICardProps {
  title: string;
  value: string;
  subtitle: string;
  percentage: string;
  isPositive: boolean;
  icon: React.ReactNode;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  propertyInterest: string;
  status: 'Hot' | 'Warm' | 'Cold';
  value: string;
  added: string;
  avatarInitials: string;
}

export interface TeamPerformance {
  rank: number;
  name: string;
  role: string;
  value: string;
  percentage: string;
  isPositive: boolean;
  progress: number;
  avatarInitials: string;
}

export interface ActivityFeedItem {
  id: string;
  user: string;
  action: string;
  target: string;
  time: string;
  type: 'contract' | 'inquiry' | 'tour' | 'proposal' | 'call' | 'listed';
}

export interface ScheduleItem {
  id: string;
  time: string;
  client: string;
  type: string;
  property: string;
}