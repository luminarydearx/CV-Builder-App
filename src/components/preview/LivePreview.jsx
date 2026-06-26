"use client";

import { usePortfolio } from "@/context/PortfolioContext";
import { allTemplateMap } from "@/lib/all-templates";
import ResumeStage from "./ResumeStage";

const MinimalTemplate = allTemplateMap.minimal;

const LivePreview = () => {
  const { data } = usePortfolio();
  const TemplateComponent = allTemplateMap[data.selectedTemplate] || MinimalTemplate;

  return (
    <ResumeStage>
      <TemplateComponent data={data} />
    </ResumeStage>
  );
};

export default LivePreview;
