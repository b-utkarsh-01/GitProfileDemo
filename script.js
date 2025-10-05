let searchProfile = document.querySelector(".searchProfile");
let userProfileID = document.querySelector(".userProfileID");
let profileCard = document.querySelector(".profileCard");

function getProfileData(profileName) {
    return fetch(`https://api.github.com/users/${profileName}`).then((rawData) => {
        if (!rawData.ok) {
            throw new Error("Something Went Wrong...");
        }
        return rawData.json();
    })
}

function displayData(details) {
    let data =
        `<div class="p-8 bg-indigo-900 text-white flex flex-col items-center justify-center md:w-2/5">
                
                <div class="w-32 h-32 mb-4 rounded-full border-4 border-indigo-400 overflow-hidden animate-pulse">
                    <img src="${details.avatar_url}" alt="${details.name} avtar" class="w-full h-full object-cover">
                </div>
                
                <h1 class="text-3xl font-bold mb-1 text-center text-white">
                    ${details.name}
                </h1>
                
                <p class="text-indigo-300 text-lg">
                    @${details.login}
                </p>
                
                
                ${details.emai ? `<div class="flex items-center justify-between w-full"><a href="${details.html_url}" target="_blank" class="mt-4 inline-block bg-indigo-400 text-indigo-900 font-semibold py-2 px-6 rounded-full hover:bg-indigo-300 transition duration-300">
                    View GitHub
                </a>

                <a href="mailto:${details.email}" target="_blank" class="mt-4 inline-block  font-semibold py-2 px-6  hover:text-indigo-300 transition duration-300">
                    Email
                </a></div>` : `<a href="${details.html_url}" target="_blank" class="mt-4 inline-block bg-indigo-400 text-indigo-900 font-semibold py-2 px-6 rounded-full hover:bg-indigo-300 transition duration-300">
                    View GitHub
                </a>`}
            </div>

            <div class="p-8 md:w-3/5 text-white">
                
                <h2 class="text-2xl font-semibold text-indigo-400 mb-4 border-b border-gray-700 pb-2">
                    User Details 💻
                </h2>
                
                <p class="text-gray-400 mb-6 italic">
                    ${details.bio ? details.bio : ""}
                </p>

                <div class="grid grid-cols-2 gap-4 text-center">
                    
                    <div class="bg-gray-700 p-4 rounded-lg border-l-4 border-indigo-500">
                        <p class="text-3xl font-extrabold text-indigo-400">
                            ${details.followers}
                        </p>
                        <p class="text-sm font-medium text-gray-400">Followers</p>
                    </div>
                    
                    <div class="bg-gray-700 p-4 rounded-lg border-l-4 border-indigo-500">
                        <p class="text-3xl font-extrabold text-indigo-400">
                            ${details.following}
                        </p>
                        <p class="text-sm font-medium text-gray-400">Following</p>
                    </div>
                    
                    <div class="bg-gray-700 p-4 rounded-lg border-l-4 border-indigo-500">
                        <p class="text-3xl font-extrabold text-indigo-400">
                            ${details.public_repos}
                        </p>
                        <p class="text-sm font-medium text-gray-400">Repositories</p>
                    </div>
                    
                    ${details.location ? `<div class="bg-gray-700 p-4 rounded-lg border-l-4 border-indigo-500">
                        <p class="text-lg font-bold text-white break-words">
                            ${details.location}
                        </p>
                        <p class="text-sm font-medium text-gray-400">Location</p>
                    </div>` : ""}
                    
                </div>  
            </div>`;

    profileCard.innerHTML = data;
}

searchProfile.addEventListener("click", () => {
    let userName = userProfileID.value.trim();
    if (userName.length > 0) {
        getProfileData(userName)
            .then(
                (userData) => {
                    displayData(userData)
                }
            )
    }
    else {
        alert("Enter Someting....");
    }
})