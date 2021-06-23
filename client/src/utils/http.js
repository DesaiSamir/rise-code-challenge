async function get (url){
    try {
        const res = await fetch(url)
            .then(res => res.json())
            .then(res => {
                return res
            })
            .catch(err => {
                console.log({err});
            });

        if(res){
            return res;
        }
    } catch (error) {
        console.log(`API service is not responding.`);
    }
    
}
async function put (url, payload = null) {
    var options = {
        method: 'put',
        headers: {
            'Content-type': 'application/json'
        },
        body: payload && JSON.stringify(payload),
    };
    try {
        
        const data = await fetch(url, options)
            .then(res => res.json())
            .then(data => {
                return data;
            })
            .catch(err => console.log({err})

        );
        if(data){
            return data;
        }
    } catch (error) {
        console.log(`API service is not responding.`);
    }
    
}

const getBlocksData = async (callback) => {
    const data = await get('api/tab-blocks');

    if (data) {
        callback(data);
    }
}

const updateSelectedTab = async (tabId) => {
    put(`api/tab-blocks/${tabId}`);
}

module.exports.getBlocksData = getBlocksData;
module.exports.updateSelectedTab = updateSelectedTab;