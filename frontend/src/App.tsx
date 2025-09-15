import { useState } from "react";

function App() {
  const [formData, setFormData] = useState({
    MedInc: "",
    HouseAge: "",
    AveRooms: "",
    AveBedrms: "",
    Population: "",
    AveOccup: "",
    Latitude: "",
    Longitude: "",
  });

  const [prediction, setPrediction] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          MedInc: parseFloat(formData.MedInc),
          HouseAge: parseFloat(formData.HouseAge),
          AveRooms: parseFloat(formData.AveRooms),
          AveBedrms: parseFloat(formData.AveBedrms),
          Population: parseFloat(formData.Population),
          AveOccup: parseFloat(formData.AveOccup),
          Latitude: parseFloat(formData.Latitude),
          Longitude: parseFloat(formData.Longitude),
        }),
      });

      const data = await response.json();
      setPrediction(data.prediction); // matches backend return key
    } catch (err) {
      console.error("Error calling API:", err);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "2rem" }}>
      <h1>California Housing Price Prediction</h1>

      <form onSubmit={handleSubmit}>
        {Object.keys(formData).map((key) => (
          <div key={key} style={{ marginBottom: "1rem" }}>
            <label>
              {key}:{" "}
              <input
                type="number"
                step="any"
                name={key}
                value={(formData as any)[key]}
                onChange={handleChange}
                required
              />
            </label>
          </div>
        ))}

        <button type="submit">Predict</button>
      </form>

      {prediction !== null && (
        <h2 style={{ marginTop: "2rem" }}>
          Predicted House Value: {prediction.toFixed(2)}
        </h2>
      )}
    </div>
  );
}

export default App;
