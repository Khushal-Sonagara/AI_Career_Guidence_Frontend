import PropTypes from "prop-types";

function TemplateSelector({ selectedTemplate, onTemplateChange }) {
  return (
    <div className="p-6 border rounded-lg bg-background">
      <h3 className="text-lg font-semibold mb-4">Choose Resume Template</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Classic Template */}
        <div className="relative">
          <input
            type="radio"
            id="classic"
            name="resume-template"
            value="classic"
            checked={selectedTemplate === "classic"}
            onChange={() => onTemplateChange("classic")}
            className="sr-only"
          />
          <label htmlFor="classic" className="cursor-pointer block">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/White%20and%20Black%20Simple%20Resume.jpg-xxZg7m8CUJBDDmUB3xx2yzPHMrhI84.jpeg"
              alt="Classic Template"
              width={300}
              height={400}
              className={`rounded-lg border-2 transition-all ${
                selectedTemplate === "classic" ? "border-primary" : "border-gray-300"
              }`}
            />
            <span className="block text-center mt-2 font-medium">Classic</span>
          </label>
        </div>

        {/* Modern Template */}
        <div className="relative">
          <input
            type="radio"
            id="modern"
            name="resume-template"
            value="modern"
            checked={selectedTemplate === "modern"}
            onChange={() => onTemplateChange("modern")}
            className="sr-only"
          />
          <label htmlFor="modern" className="cursor-pointer block">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Blue%20Simple%20Professional%20CV%20Resume.jpg-KaiRSviXfQ4lwrrhQ01iwG1WQqcVE7.jpeg"
              alt="Modern Template"
              width={300}
              height={400}
              className={`rounded-lg border-2 transition-all ${
                selectedTemplate === "modern" ? "border-primary" : "border-gray-300"
              }`}
            />
            <span className="block text-center mt-2 font-medium">Modern</span>
          </label>
        </div>

        {/* Timeline Template */}
        <div className="relative">
          <input
            type="radio"
            id="timeline"
            name="resume-template"
            value="timeline"
            checked={selectedTemplate === "timeline"}
            onChange={() => onTemplateChange("timeline")}
            className="sr-only"
          />
          <label htmlFor="timeline" className="cursor-pointer block">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Blue%20and%20Gray%20Simple%20Professional%20CV%20Resume.jpg-PB2CpLenqtO05HFHPLfEsoEF61v6aW.jpeg"
              alt="Timeline Template"
              width={300}
              height={400}
              className={`rounded-lg border-2 transition-all ${
                selectedTemplate === "timeline" ? "border-primary" : "border-gray-300"
              }`}
            />
            <span className="block text-center mt-2 font-medium">Timeline</span>
          </label>
        </div>
      </div>
    </div>
  );
}

TemplateSelector.propTypes = {
  selectedTemplate: PropTypes.string.isRequired,
  onTemplateChange: PropTypes.func.isRequired,
};

export default TemplateSelector;
