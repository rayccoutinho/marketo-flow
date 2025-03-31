import { FiAlertTriangle, FiTrendingUp, FiClock, FiChevronRight } from "react-icons/fi";

// InsightCard.tsx
export interface Insight {
    id: string;
    title: string;
    description: string;
    type: "performance" | "engagement" | "budget" | "content";
    channel: string;
    priority: "high" | "medium" | "critical";
    suggestedAction: string;
    date: string;
    metrics?: {
      current: number;
      benchmark: number;
      unit?: string;
    };
  }

interface InsightCardProps {
  insight: Insight;
  className?: string;
  showActionButton?: boolean;
  compact?: boolean;
}

const PRIORITY_ICONS = {
  critical: <FiAlertTriangle className="text-red-500" size={18} />,
  high: <FiTrendingUp className="text-yellow-500" size={18} />,
  medium: <FiClock className="text-blue-500" size={18} />,
};

const CHANNEL_COLORS: Record<string, string> = {
  instagram: "bg-gradient-to-r from-pink-500 to-yellow-500",
  meta_ads: "bg-blue-600",
  google_ads: "bg-gradient-to-r from-blue-500 to-green-500",
  website: "bg-gray-600",
};

export default function InsightCard({
  insight,
  className = "",
  showActionButton = true,
  compact = false,
}: InsightCardProps) {
  const getChannelColor = (channel: string) => {
    return CHANNEL_COLORS[channel] || "bg-gray-500";
  };

  return (
    <div
      className={`p-4 border rounded-lg shadow-sm hover:shadow-md transition-all duration-200 ${className} ${
        insight.priority === "critical"
          ? "border-red-100 bg-red-50"
          : insight.priority === "high"
          ? "border-yellow-100 bg-yellow-50"
          : "border-gray-100 bg-white"
      }`}
    >
      <div className="flex gap-3 items-start">
        <div className={`mt-1 ${compact ? "text-sm" : ""}`}>
          {PRIORITY_ICONS[insight.priority]}
        </div>

        <div className="flex-1">
          <div className="flex justify-between items-start gap-2">
            <h3 className={`font-medium ${compact ? "text-sm" : ""}`}>
              {insight.title}
            </h3>
            {!compact && (
              <span
                className={`inline-block w-3 h-3 rounded-full ${getChannelColor(
                  insight.channel
                )}`}
                title={insight.channel}
              />
            )}
          </div>

          <p className={`text-gray-600 mt-1 ${compact ? "text-xs" : "text-sm"}`}>
            {insight.description}
          </p>

          {insight.metrics && (
            <div className="mt-2 flex items-center gap-2">
              <span className="font-medium">
                {insight.metrics.current}
                {insight.metrics.unit}
              </span>
              <span className="text-gray-500 text-sm">
                vs. benchmark: {insight.metrics.benchmark}
                {insight.metrics.unit}
              </span>
            </div>
          )}

          <div className="mt-3 flex flex-wrap items-center gap-2">
            {!compact && (
              <span
                className={`text-xs px-2 py-1 rounded-full capitalize ${
                  insight.priority === "critical"
                    ? "bg-red-100 text-red-800"
                    : insight.priority === "high"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {insight.type}
              </span>
            )}
            <span className="text-xs text-gray-500">
              {new Date(insight.date).toLocaleDateString("pt-BR")}
            </span>
          </div>
        </div>

        {showActionButton && (
          <div className="flex flex-col items-end justify-between h-full">
            <div className="bg-blue-50 p-2 rounded-lg min-w-[120px]">
              <p
                className={`font-medium text-blue-600 ${
                  compact ? "text-xs" : "text-sm"
                }`}
              >
                {insight.suggestedAction}
              </p>
            </div>
            {!compact && (
              <button className="mt-2 text-blue-600 hover:text-blue-800 flex items-center gap-1 text-xs">
                Detalhes <FiChevronRight size={12} />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}