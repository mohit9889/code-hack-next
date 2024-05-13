const API_BASE_PATH = process.env.API_BASE_URL;

export const getAllTricksData = async () => {
  try {
    const res = await fetch(`${API_BASE_PATH}/hacks`);
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const getSingleTrickData = async (id = "") => {
  try {
    const res = await fetch(`${API_BASE_PATH}/hacks/${id}`);
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const getAllNewTricksData = async () => {
  try {
    const res = await fetch(`${API_BASE_PATH}/hacks/new`);
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const getAllTopTricksData = async () => {
  try {
    const res = await fetch(`${API_BASE_PATH}/hacks/top`);
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const getAllHotTricksData = async () => {
  try {
    const res = await fetch(`${API_BASE_PATH}/hacks/hot`);
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const likeHack = async (id) => {
  try {
    const response = await fetch(`${API_BASE_PATH}/hacks/${id}/like`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to like the hack");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to like the hack:", error);
  }
};

export const dislikeHack = async (id) => {
  try {
    const response = await fetch(`${API_BASE_PATH}/hacks/${id}/dislike`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to dislike!");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to dislike the hack:", error);
  }
};

export const submitHack = async (data) => {
  try {
    const response = await fetch(`${API_BASE_PATH}/hacks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Failed to submit the hack.");
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Failed to submit the hack:", error);
    throw error;
  }
};

export const addCommentToHack = async (hackId, commentData) => {
  try {
    const response = await fetch(`${API_BASE_PATH}/hacks/${hackId}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(commentData),
    });
    if (!response.ok) {
      throw new Error("Failed to add comment");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error adding comment:", error);
  }
};

export const addReplyToComment = async (hackId, commentId, replyData) => {
  try {
    const response = await fetch(`${API_BASE_PATH}/hacks/${hackId}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...replyData, replyTo: commentId }),
    });
    if (!response.ok) {
      throw new Error("Failed to add reply");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error adding reply:", error);
  }
};

export const likeComment = async (hackId, commentId) => {
  try {
    const response = await fetch(
      `${API_BASE_PATH}/hacks/${hackId}/comments/${commentId}/like`,
      {
        method: "POST",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to like the comment");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error liking the comment:", error);
    throw error;
  }
};

export const dislikeComment = async (hackId, commentId) => {
  try {
    const response = await fetch(
      `${API_BASE_PATH}/hacks/${hackId}/comments/${commentId}/dislike`,
      {
        method: "POST",
      }
    );
    if (!response.ok) {
      throw new Error("Failed to dislike the comment");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error disliking the comment:", error);
    throw error;
  }
};

export const reportHack = async (hackId) => {
  try {
    console.log(`${API_BASE_PATH}/hacks/${hackId}/report`, "<<<<RESPONSE");
    const response = await fetch(`${API_BASE_PATH}/hacks/${hackId}/report`, {
      method: "POST",
    });
    console.log(response, "<<<<RESPONSE");
    if (!response.ok) {
      throw new Error("Failed to report the hack");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error Reporting the hack:", error);
    throw error;
  }
};

export const visitedHack = async (id) => {
  try {
    const response = await fetch(`${API_BASE_PATH}/hacks/${id}/visited`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to like the hack");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to like the hack:", error);
  }
};
