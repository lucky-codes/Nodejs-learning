import axios from "axios";
const token = localStorage.getItem("token");
export const signupApi = async ({ data }) => {
  const { month, day, year } = data.birthDate;
  try {
    const requestData = {
      ...data,
      birthDate:
        month && day && year ? new Date(`${year}-${month}-${day}`) : null,
    };
    const response = await axios.post(
      "http://localhost:3000/signup",
      requestData
    );
    if (response.status != 200) {
      throw new Error(response.data.message || "invalid Entry");
    } else {
      alert("Account created");
    }
  } catch (error) {
    console.log(error);
  }
};

export const loggedInUserData = async (setData) => {
  try {
    if (!token) {
      throw new Error("Token not found in localStorage");
    }

    const response = await axios.get("http://localhost:3000/profile/view", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response) {
      throw new Error("Not getting any response from backend");
    }
    setData(response.data);
  } catch (error) {
    console.log("error=>", error.response?.message || error);
  }
};
export const allUserProfileData = async (setData) => {
  try {
    if (!token) {
      throw new Error("User not logged in");
    }
    const response = await axios.get("http://localhost:3000/feed", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response || !response.data) {
      throw new Error("No valid response from the backend");
    }

    setData(response.data.Data);
  } catch (error) {
    console.log("error", error);
  }
};
export const sendRequestApi = async (status, userId) => {
  try {
    const response = await axios.post(
      `http://localhost:3000/request/send/${status}/${userId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response) {
      throw new Error("No valid response from the backend");
    }
  } catch (error) {
    console.log(error);
  }
};
export const RequestApi = async (setData) => {
  try {
    if (!token) {
      throw new Error("Token is not valid");
    }
    const response = await axios.get(
      "http://localhost:3000/user/request/received",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setData(response.data.data);
    console.log(response.data.data);
    if (response.status != 200) {
      throw new Error("No respose from api");
    }
  } catch (error) {
    console.log(error);
  }
};
export const RequestactionApi = async (decision, id) => {
  try {
    const response = await axios.post(
      `http://localhost:3000/request/review/${decision}/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response) {
      throw new Error("Error while sending data");
    }
  } catch (error) {
    console.log(error);
  }
};
export const connectionsApi = async (setData) => {
  try {
    if (!token) {
      throw new Error("User not logged in");
    }
    const response = await axios.get("http://localhost:3000/user/connection", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data.data)
    setData(response.data.data)
  } catch (error) {
    console.log(error);
  }
};
// const signupApi = async()=>{
//  try {
//   const requestData = {
//     ...data,
//     birthDate: `${data.birthDate.year}-${data.birthDate.month}-${data.birthDate.day}`,
//   };
//   const response =await fetch("http://localhost:7777/signup",{
//     method: 'POST',
//     headers:{
//       "Content-Type" : "application/json"
//     },
//     body:JSON.stringify(requestData)

//   })
//   console.log(JSON.stringify(requestData));
//   const result = await response.json()
//   if(!response.ok){
//      throw new Error(result.message||'Invalid Entry')
//   }
//   console.log({data:result})
//  } catch (error) {
//    console.log(error.message)
//  }

// }
