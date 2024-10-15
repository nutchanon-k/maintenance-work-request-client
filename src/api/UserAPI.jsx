import axios from "axios";

export const getMaintenanceMembersAPI =  async (token) => {
        const result =  await axios.get("http://localhost:8000/user/assign-users", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return result;
}