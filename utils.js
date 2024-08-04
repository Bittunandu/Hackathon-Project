import axios from "axios";
import {data} from "./data";

function filterKeysBySubstring(substring) {
    return Object.fromEntries(
      Object.entries(data).filter(([key]) => key.includes(substring))
    );
  }
const human = ['head', 'hand', 'face', 'man', 'male', 'girl', 'boy', 'woman', 'adult', 'person', 'people', 'female', 'standing', 'sitting', 'urban']

const getObjectsFromImage = (data) => {
    const objects = {};
    for(let key in data) {
        let items = data[key]?.items
        let len = items.length;
        for(let i =0; i<len; i++) {
            if(items[i].confidence > 0.9) {
                let label = items[i].label.split(' ').join('').toLowerCase();
                let filteredObj = filterKeysBySubstring(label);
                let firstKey = Object.keys(filteredObj)[0];
                if(firstKey && human.indexOf(label) === -1) {
                    objects[items[i].label] = {label: items[i].label, ...filteredObj[firstKey]}
                }
            }
        }
    }
    return objects;
}
export const getObjectList = async({type, selectedFile}) => {
    const form = new FormData();
    form.append("providers", "google,amazon");
    if(type === 'form'){
        form.append('file', selectedFile, 'image.png')
    } else {
        form.append("file", selectedFile);
    }

    const options = {
        method: "POST",
        url: "https://api.edenai.run/v2/image/object_detection",
        headers: {
            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMGU3ZmM4NTAtOGUxYy00NmI2LTg3MjAtNDYwMzhlOTI0ODM0IiwidHlwZSI6ImFwaV90b2tlbiJ9.UG8VGsbHSVGJ8O8lZGDTmDuExKdQPCqc4HctTIdVOdQ",
        },
        data: form,
    };
    return axios
        .request(options)
        .then((response) => {
            return getObjectsFromImage(response.data);
        })
        .catch((error) => {
            console.error(error);
        });
}
