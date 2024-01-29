function distanceInMeters(lat1, lon1, lat2, lon2) {
    const radius = 6371; // Raio da Terra em km
    const dLat = grauToRad(lat2 - lat1); // Diferença de latitude em radianos
    const dLon = grauToRad(lon2 - lon1); // Diferença de longitude em radianos
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(grauToRad(lat1)) * Math.cos(grauToRad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2); //seno quadrado da metade da diferença de latitude e da metade da diferença de longitude.
    const arcTangent = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); //Calcula o arco tangente
    const distance = (radius * arcTangent)*1000; // Distância em Metros
    return distance;
};

function grauToRad(deg) {
    return deg * (Math.PI / 180);
};

console.log(distanceInMeters(-38.6040397969916, -12.737539328308999, -38.604024964398597, -12.737560665820601));