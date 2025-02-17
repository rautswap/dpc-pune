import { SERVICE_URI } from "../CommonComponent/utils";

export const SearchUtils = {
    getYear() {
        let result = fetch(SERVICE_URI + "years")
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                return data.data.table
            });
        return result;
    },
    getTaluka() {
        let result = fetch(SERVICE_URI + "talukas-by-district-code/534")
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                return data.data.table
            });
        return result;
    },
    getStaus(){
        let result = fetch(SERVICE_URI + "work-status")
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            return data.data.table
        });
    return result;
    }
}
