// import React, { useState, useEffect } from "react";
// import { useParams, useHistory } from "react-router-dom";


// function ProjectPage(props) {
//     const [projectData, setProjectData] = useState({pledges: [] });
//     const { id } = useParams();
//     const history=useHistory()
    
//     useEffect(() => {
//         fetch(`${process.env.REACT_APP_API_URL}projects/${id}`)
//         .then((results) => {
//         return results.json();
//         })
//         .then((data) => {
//         setProjectData(data);
//         });
//     }, []);
    
//     const deleteProject = async () => {
//         await fetch(`${process.env.REACT_APP_API_URL}projects/${id}`, 
//         {   
//             method: "delete",
//             headers: {
//                 "Authorization": `token ${window.localStorage.getItem("token")}`
//             }
//         })
//         history.push("/")
//     }

//     return (
//     <div>
//         <h2>{projectData.title}</h2>
//         <h3>{`Status: ${projectData.description}`}</h3>
//         <h3>Created at: {projectData.date_created}</h3>
//         <h3>{`Status: ${projectData.is_open}`}</h3>
//         <h3>Pledges:</h3>

//         <ul>
//             {projectData.pledges.map((pledgeData, key) =>{
//                 return (
//                 <li>
//                     {pledgeData.amount} from {pledgeData.supporter}
//                 </li>
//                 );
//             })}
//         </ul>
//         <button onClick={deleteProject}>Delete</button>
//     </div>);
// }

// export default ProjectPage;


import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";

const ProjectPage = () => {
    const [projectData, setProjectData] = useState({pledges: [] });
    const [isEditing, setIsEditing] = useState(false);

    const { id: project_id } = useParams();
    
    useEffect(() => {
        fetch(`${process.env.REACT_APP_API_URL}projects/${project_id}`)
        .then((results) => {
            return results.json();
        })
        .then((data) => {
            setProjectData(data);
        });
    }, [project_id]);

    // What can we edit in a page
    // Title, description, goal, image, is_open

    const handleChange = (event) => {
        const { id, value } = event.target
        setProjectData({
            ...projectData,
            [id]:value

        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        console.log("Hello")

        const response = await fetch(
            `${process.env.REACT_APP_API_URL}projects/${project_id}`,
            {
            method: "put",
            headers: {
                "Authorization": `Token ${localStorage.getItem('token')}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: projectData.title,
                is_open: projectData.is_open,
                description: projectData.description,
                amount: projectData.amount,
                image: projectData.image,
                location: projectData.location,
                category: projectData.category

            }
            ),
        }
        );

        setIsEditing(false)

        console.log("Bye", response)
    }



    const ReadProject = () => {
        return (
            <div>
                <h2>{projectData.title}</h2>
                <h2>{projectData.description}</h2>
                <h3>Created at: {projectData.date_created}</h3>
                <h3>{`Status: ${projectData.is_open}`}</h3>
                <h3>Pledges:</h3>
                <ul>
                    {projectData.pledges.map((pledgeData, key) =>{
                        return (
                        <li key={key}>
                            {pledgeData.amount} from {pledgeData.supporter}
                        </li>
                            );
                })}
                </ul>
            </div>

        )
    }

    console.log("Project data is:",projectData)

    return (
        <div>
            {
            localStorage.getItem('token') 
            && isEditing == false
            && <button onClick={() => setIsEditing(true)}>Edit Project</button>
            }
            <div>
            {
                isEditing
                ? (
                    <form onSubmit={handleSubmit}>
                    <div>
                        <div>
                        <label htmlFor="ProjectTitle">Title:</label>
                        <input
                            value={projectData.title}
                            type="text"
                            id="title"
                            placeholder="Title"
                            onChange={handleChange}
                        />
                        </div>
                        <div>
                        <label htmlFor="IsOpen">Is_Open:</label>
                        <input
                            value={projectData.is_open}
                            type="text"
                            id="is_open"
                            placeholder="IsOpen"
                            onChange={handleChange}
                        />
                        </div>
                        <label htmlFor="ProjectDescription">Description:</label>
                        <input
                            value={projectData.description}
                            type="text"
                            id="description"
                            placeholder="Description..."
                            onChange={handleChange}
                        />
                        <div>
                        <label htmlFor="Goal">Amount:</label>
                        <input
                            value={projectData.amount}
                            type="number"
                            id="amount"
                            placeholder="Amount"
                            onChange={handleChange}
                        />
                        </div>
                        <div>
                        <label htmlFor="Image">Image:</label>
                        <input
                            value={projectData.image}
                            type="text"
                            id="image"
                            placeholder="Image"
                            onChange={handleChange}
                        />
                        </div>
                        <div>
                        <label htmlFor="Location">Location:</label>
                        <input
                            value={projectData.location}
                            type="text"
                            id="location"
                            placeholder="Location"
                            onChange={handleChange}
                        />
                        </div>
                        <div>
                        <label htmlFor="Category">Category:</label>
                        <input
                            value={projectData.category}
                            type="text"
                            id="category"
                            placeholder="Category"
                            onChange={handleChange}
                        />
                        </div>
                    </div>
                    <button type="submit">Submit</button>
                    <button onClick={() => setIsEditing(false)}>Cancel</button>
                    
                </form>
                    
                )
                : <ReadProject />

            }
            </div>
            
        </div>
    )
}



export default ProjectPage














