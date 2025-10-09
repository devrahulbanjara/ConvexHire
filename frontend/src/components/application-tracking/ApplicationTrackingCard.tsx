import React from 'react';
import type { Application, ApplicationStatus } from '../../types/application';
import { formatDistanceToNow } from 'date-fns';
import { Calendar, CheckCircle, XCircle, Clock, Eye, Gift } from 'lucide-react';

interface ApplicationTrackingCardProps {
  application: Application;
}

export const ApplicationTrackingCard: React.FC<ApplicationTrackingCardProps> = ({ application }) => {
  // Format the date to show as "Applied 1y ago" (shorter format)
  const formattedDate = `Applied ${formatDistanceToNow(new Date(application.applied_date), { addSuffix: true }).replace('about ', '').replace(' ago', '')} ago`;
  
  // Get status badge styling
  const getStatusInfo = (status: ApplicationStatus) => {
    switch (status) {
      case "pending":
        return { 
          icon: Clock, 
          label: 'Pending',
          bgColor: '#F1F5F9',
          textColor: '#64748B'
        };
      case "under_review":
        return { 
          icon: Eye, 
          label: 'Under Review',
          bgColor: '#EFF6FF',
          textColor: '#3B82F6'
        };
      case "interview_scheduled":
        return { 
          icon: Calendar, 
          label: 'Interview Scheduled',
          bgColor: '#EFF6FF',
          textColor: '#3056F5'
        };
      case "offer_extended":
        return { 
          icon: Gift, 
          label: 'Offer Extended',
          bgColor: '#F0FDF4',
          textColor: '#16A34A'
        };
      case "accepted":
        return { 
          icon: CheckCircle, 
          label: 'Accepted',
          bgColor: '#F0FDF4',
          textColor: '#16A34A'
        };
      case "rejected":
        return { 
          icon: XCircle, 
          label: 'Rejected',
          bgColor: '#FEF2F2',
          textColor: '#DC2626'
        };
      default:
        return { 
          icon: Clock, 
          label: 'Pending',
          bgColor: '#F1F5F9',
          textColor: '#64748B'
        };
    }
  };

  const statusInfo = getStatusInfo(application.status);
  const StatusIcon = statusInfo.icon;

  return (
    <article 
      className="bg-white rounded-xl border border-[#E5E7EB] p-5 transition-all duration-200 hover:border-[#CBD5E1] cursor-pointer group"
      style={{ boxShadow: '0 0 0 rgba(0,0,0,0)' }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.06)';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 0 0 rgba(0,0,0,0)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {/* Job Title */}
      <h4 className="font-semibold text-base text-[#0F172A] mb-2 leading-tight group-hover:text-[#3056F5] transition-colors">
        {application.job_title}
      </h4>
      
      {/* Company Name */}
      <p className="text-sm text-[#475569] mb-4">
        {application.company_name}
      </p>
      
      {/* Status Badge */}
      <div 
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium mb-4"
        style={{ 
          backgroundColor: statusInfo.bgColor,
          color: statusInfo.textColor
        }}
        role="status"
        aria-label={`Application status: ${statusInfo.label}`}
      >
        <StatusIcon className="h-3.5 w-3.5" aria-hidden="true" />
        <span>{statusInfo.label}</span>
      </div>
      
      {/* Timestamp - Footer with border */}
      <div className="pt-3 mt-3 border-t border-[#F1F5F9]">
        <time 
          className="text-xs text-[#94A3B8]"
          dateTime={application.applied_date}
          title={`Applied on ${new Date(application.applied_date).toLocaleDateString()}`}
        >
          {formattedDate}
        </time>
      </div>
    </article>
  );
};

ApplicationTrackingCard.displayName = 'ApplicationTrackingCard';
