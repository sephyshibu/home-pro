import React ,{useState} from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router";
import { addreview } from "../../../api/UserApi/AddReview/addreview";
const ThankYouPage: React.FC = () => {
  const {techId}=useParams()
  const navigate=useNavigate()
  const [description, setDescription] = useState("");
  const [points, setPoints] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);


    const handleClick=()=>{
            navigate('/')
    }

     const handleSubmit = async () => {
      console.log("thank u service techId",techId)
        if (!description.trim() || !techId) return;

        try {
          setIsSubmitting(true);
          const userId = localStorage.getItem("userId");
          await addreview( userId!, techId, description, points );
          setSubmitted(true);
        } catch (error) {
          console.error("Error submitting review:", error);
        } finally {
          setIsSubmitting(false);
        }
      };
  return (
    <div className="min-h-screen flex flex-col">

      

      {/* Success Content */}
      <main className="flex-grow flex items-center justify-center bg-gray-50 px-4 py-20">
        <div className="bg-white rounded-xl shadow-lg text-center p-8 max-w-md w-full">
          <div className="bg-[#0B1C42] text-white rounded-t-xl py-4 text-lg font-semibold">
            Successful Order
          </div>
          <div className="py-10">
           
            <h2 className="text-xl font-semibold mb-2">Thank you for the Service!!</h2>
            <p className="text-gray-600 mb-6">
              Your Payment is successfully Completed.Thank You!
            </p>
            {!submitted ? (
              <>
                <textarea
                  className="w-full border rounded p-2 mb-4"
                  placeholder="Leave your review here..."
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Rate the technician:</label>
                  <select
                    value={points}
                    onChange={(e) => setPoints(Number(e.target.value))}
                    className="w-full border rounded p-2"
                  >
                    {[1, 2, 3, 4, 5].map((star) => (
                      <option key={star} value={star}>{star} ⭐</option>
                    ))}
                  </select>
                </div>
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full"
                >
                  {isSubmitting ? "Submitting..." : "Submit Review"}
                </button>
              </>
            ) : (
              <p className="text-green-600 font-semibold mt-4">✅ Review Submitted!</p>
            )}

            <button onClick={handleClick} className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full">
              Home
            </button>
          </div>
        </div>
      </main>

     
    </div>
  );
};

export default ThankYouPage;
