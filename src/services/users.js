import HttpRequest from 'utils/httpRequest';
import { isEmpty } from 'utils/util';
import { HttpMethod, ContentType } from 'constants/common';

export function getUserList() {
    return HiggsRequest({
        url: '/users'
    });
}

export function getUserById(id) {
    return HiggsRequest({
        url: `/users/${id}`
    });
}

// export function updateAgent(agent = {}) {
//     return HttpRequest({
//         type: HttpMethod.PUT,
//         ContentType: ContentType.JSON,
//         url: `/agents/${agent.id}`,
//         data: agent
//     });
// }

// export function deleteResource(id, resource) {
//     if (isEmpty(id) || isEmpty(resource)) {
//         return;
//     }

//     return new Promise(function(resolve, reject) {
//         getAgentById(id).then((agent) => {
//             if (agent) {
//                 agent.resources = agent.resources.filter((res) => {
//                     return res.toLowerCase() !== resource.toLowerCase();
//                 });

//                 updateAgent(agent).then(() => {
//                     resolve();
//                 }, (error) => reject(error));
//             } else {
//                 reject(agent);
//             }
//         }, (error) => reject(error));
//     });
// }

// export function addResources(id, resources) {
//     if (isEmpty(id) || isEmpty(resources)) {
//         return;
//     }
//     // 去除重复的 resource
//     resources = resources.filter((value, index, array) => array.indexOf(value) === index);

//     return new Promise(function(resolve, reject) {
//         getAgentById(id).then((agent) => {
//             if (agent) {
//                 if (isEmpty(agent.resources)) {
//                     agent.resources = [];
//                 }
//                 agent.resources.push(...resources);

//                 updateAgent(agent).then(() => {
//                     resolve();
//                 }, (error) => reject(error));
//             } else {
//                 reject(agent);
//             }
//         }, (error) => reject(error));
//     });
// }