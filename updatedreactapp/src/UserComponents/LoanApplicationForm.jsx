import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import "./LoanApplicationForm.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

function LoanApplicationForm() {
  const navigate = useNavigate();
  const userId = useSelector((state) => state.user.userId);
  const userName = useSelector((state) => state.user.userName);
  const loanType = useSelector((state) => state.loan.loanType);
  const [successPopup, setSuccessPopup] = useState(false);
  const [filePreview, setFilePreview] = useState(null); // State to store file preview

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    let requestObject = {
      userId: userId,
      userName: userName,
      loanType: loanType,
      submissionDate: new Date(),
      income: data.income,
      purchasePrice: data.purchasePrice,
      model: data.model,
      address: data.address,
      loanStatus: 0,
      file: filePreview, // Include the base64 encoded file
    };

    try {
      console.log("requestObject", requestObject);
      const response = await axios.post(
        "https://8080-abfheadersdabeabcbaedbbdbffcedacbfdaeffdedfbedfefba.premiumproject.examly.io/loanApplication/addLoanApplication",
        requestObject,
        {
          "": {
            Authorization:localStorage.getItem("token"), // Add the token to the Authorization header
          },
        }
      );
      console.log("response in application", response);
      if (response.status === 200) {
        setSuccessPopup(true);
      }
      // Handle success
    } catch (error) {
      alert("Something Went wrong");
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    if (file) {
      try {
        const base64String = await convertFileToBase64(file);
        setFilePreview(base64String);
      } catch (error) {
        console.error("Error converting file to base64:", error);
      }
    }
  };

  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result); // Include the data URL prefix
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(file);
    });
  };

  function handleSuccessMessage() {
    setSuccessPopup(false);
    navigate("/availableloan");
  }

  return (
    <div>
      <div className={`container ${successPopup ? "blur" : ""}`}>
        <div className="button-container">
          <button onClick={() => navigate(-1)}>Back</button>
          <h2>Loan Application Form</h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
        <div>
            <label htmlFor="income">Income:</label>
            <Controller
              name="income"
              control={control}
              rules={{ required: "Income is required" }}
              render={({ field }) => (
                <div>
                  <input id="income" type="text" {...field} />
                  {errors.income && (
                    <div className="error">{errors.income.message}</div>
                  )}
                </div>
              )}
            />
          </div>

          <div>
            <label htmlFor="model">Model:</label>
            <Controller
              name="model"
              control={control}
              rules={{ required: "Model is required" }}
              render={({ field }) => (
                <div>
                  <input id="model" type="date" {...field} />
                  {errors.model && (
                    <div className="error">{errors.model.message}</div>
                  )}
                </div>
              )}
            />
          </div>

          <div>
            <label htmlFor="purchasePrice">Purchase Price:</label>
            <Controller
              name="purchasePrice"
              control={control}
              rules={{ required: "Purchase Price is required" }}
              render={({ field }) => (
                <div>
                  <input id="purchasePrice" type="text" {...field} />
                  {errors.purchasePrice && (
                    <div className="error">{errors.purchasePrice.message}</div>
                  )}
                </div>
              )}
            />
          </div>

          <div>
            <label htmlFor="address">Address:</label>
            <Controller
              name="address"
              control={control}
              rules={{ required: "Address is required" }}
              render={({ field }) => (
                <div>
                  <input id="address" type="text" {...field} />
                  {errors.address && (
                    <div className="error">{errors.address.message}</div>
                  )}
                </div>
              )}
            />
          </div>
          <div>
          <label htmlFor="file">File Upload:</label>
          <Controller
            name="file"
            control={control}
            rules={{ 
              required: "File is required",
              validate: (value) => {
                return !!value; // Validate file presence
              },
            }}
            render={({ field }) => (
              <div>
                <input
                  id="file"
                  type="file"
                  onChange={(e) => {
                    field.onChange(e);
                    handleFileChange(e);
                  }}
                  accept=".jpg, .jpeg, .png, .pdf" // Specify the allowed file types
                />
                {errors.file && (
                  <div className="error">{errors.file.message}</div>
                )}
              </div>
            )}
          />
        </div>

          {/* ... (existing fields) */}

          <div>
            <button type="submit" className="submit-button">
              Submit
            </button>
          </div>
        </form>
      </div>
      {successPopup && (
        <div className="success-popup">
          <p>Successfully Added!</p>
          <button onClick={handleSuccessMessage}>Ok</button>
        </div>
      )}
    </div>
  );
}

export default LoanApplicationForm;
