import React, { useContext, useEffect, useState } from "react";
import { ResumeInfoContext } from "../../../context/ResumeInfoContext";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { LoaderCircle, Brain } from "lucide-react";
import ResumeSummariesService from "../../../../../Services/ResumeSummariesService";
import { Button } from "../../../../ui/button";
import { Textarea } from "../../../../ui/textarea";
import { AIChatSession } from "../../../../../Services/AIModal";

const prompt =
  'Job Title: {jobTitle} , Based on the job title, provide a list of summary suggestions for three experience levels: Experienced, Mid-Level, and Fresher. Each summary should be 3-4 lines in JSON format with "summary" and "experience_level" fields.';

function Summary({ enabledNext }) {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState("");
  const [selectedSummary, setSelectedSummary] = useState(null);
  const [aiGeneratedSummaryList, setAiGenerateSummaryList] = useState([]);

  useEffect(() => {
    if (resumeInfo?.resumeSummary?.summaryText) {
      setSummary(resumeInfo.resumeSummary.summaryText);
      setSelectedSummary(resumeInfo.resumeSummary.summaryText);
    }
  }, [resumeInfo]);

  const GenerateSummaryFromAI = async () => {
    setLoading(true);
    const PROMPT = prompt.replace("{jobTitle}", resumeInfo.personalDetails?.jobTitle);

    try {
      const result = await AIChatSession.sendMessage(PROMPT);
      const respText = await result.response.text();

      let aiResponse;
      try {
        aiResponse = JSON.parse(respText);
      } catch (error) {
        console.error("JSON Parsing Error:", error);
        toast.error("Invalid AI response format.");
        return;
      }

      if (!aiResponse || !Array.isArray(aiResponse.summaries)) {
        console.error("Unexpected AI response format:", aiResponse);
        toast.error("AI did not return a valid summary list.");
        return;
      }

      setAiGenerateSummaryList(aiResponse.summaries);
    } catch (error) {
      console.error("AI generation failed:", error);
      toast.error("Failed to generate AI summary");
    } finally {
      setLoading(false);
    }
  };

  const onSave = async (e) => {
    e.preventDefault();
    setLoading(true);

    let data = {
      resumeID: params.id,
      summaryText: Array.isArray(summary) ? summary.join(" ") : summary,
    };

    try {
      if (resumeInfo?.resumeSummary?.summaryID) {
        data = { ...data, summaryID: resumeInfo.resumeSummary.summaryID };
        console.log("data",data)
        await ResumeSummariesService.update(data);
        toast.success("Summary updated successfully!");
      } else {
        console.log("data",data)
        const response = await ResumeSummariesService.insert(data);
        toast.success("Summary added successfully!");

        setResumeInfo((prev) => ({
          ...prev,
          resumeSummary: { ...data, summaryID: response?.summaryID },
        }));
      }
      enabledNext(true);
    } catch (error) {
      toast.error("Server error, please try again!");
      console.error("API error:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        borderTop: "4px solid #007bff",
        marginTop: "20px",
        borderRadius: "8px",
      }}
    >
      <h2 style={{ fontWeight: "bold", fontSize: "18px" }}>Summary</h2>
      <p>Add a summary for your job title</p>

      <form className="mt-4" onSubmit={onSave}>
        <div className="d-flex justify-content-between align-items-end">
          <label>Add Summary</label>
          <div className="d-flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={GenerateSummaryFromAI}
              disabled={loading}
              className="border-primary d-flex gap-2"
              style={{ borderColor: "#007bff", color: "black", display: "flex", gap: "10px" }}
            >
              {loading ? <LoaderCircle className="spinner-border spinner-border-sm" /> : <Brain style={{ height: "16px", width: "16px" }} />}
              Generate from AI
            </Button>
          </div>
        </div>

        <Textarea
          className="mt-3 form-control"
          required
          value={summary}
          onChange={(e) => {
            setSummary(e.target.value);
            setSelectedSummary(null);
          }}
          style={{ marginTop: "10px", padding: "10px", width: "100%", borderRadius: "5px",height:'200px' }}
        />

        <div className="mt-3 d-flex justify-content-end">
          <Button type="submit" disabled={loading} className="btn btn-primary">
            {loading ? <LoaderCircle className="spinner-border spinner-border-sm" /> : resumeInfo?.resumeSummary?.summaryID ? "Update" : "Save"}
          </Button>
        </div>
      </form>

      {/* AI Generated Summary Suggestions */}
      {aiGeneratedSummaryList.length > 0 && (
        <div className="mt-4">
          <h2 style={{ fontWeight: "bold", fontSize: "1.25rem" }}>AI Suggestions</h2>
          {aiGeneratedSummaryList.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                setSummary(item?.summary);
                setSelectedSummary(item?.summary);
              }}
              className={`p-4 shadow-lg my-3 rounded-lg cursor-pointer ${
                selectedSummary === item?.summary ? "border border-primary" : ""
              }`}
              style={{
                padding: "15px",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                borderRadius: "10px",
                cursor: "pointer",
                border: selectedSummary === item?.summary ? "2px solid #007bff" : "none",
              }}
            >
              <h2 className="font-bold my-1 text-primary" style={{ color: "#007bff" }}>
                Level: {item?.experience_level}
              </h2>
              <p>{item?.summary}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Summary;
