import axios from "axios";

export async  function getCategory(alias) {
  try {
    const res = await axios.get("http://127.0.0.1:8000/Video/category/:" + alias);
    return await res.data;
  } catch (e) {
    console.log(e.message);
    return null
  }
}
