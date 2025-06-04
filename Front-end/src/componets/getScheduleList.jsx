import axios from "axios";

const getScheduleList = async( setScheduleList ) => {
    try {
        const responseListData = await axios.get('http://localhost:3000/schedules');
        setScheduleList(responseListData.data);
    } catch (error) {
        console.error(`getScheduleList Error : ${error}`);
    }
}

export default getScheduleList;