import React, { useState, useEffect } from 'react'

import { Form,Button } from 'react-bootstrap';

// These are our components
import ProjectCard from '../components/ProjectCard/ProjectCard'

const HomePage = () => {
    const [projectList, setProjectList] = useState([]);
    // use state to add project pledges

    const [projectData, setProjectData] = useState({pledges: [] });
    const [addProject, setAddProject] = useState(false);

   
    const getProjects = () => {
        fetch(`${process.env.REACT_APP_API_URL}projects`).
        then((results) => {
            return results.json();
        })
        .then((data) => {
            setProjectList(data);
        });
    }

    useEffect(() => {
        getProjects()
    }, []);

    // add the button to the below

    const handleChange = (event) => {
        const { id, value } = event.target
        console.log(id,value)
        setProjectData({
            ...projectData,
            [id]:value

        })
    }


    const handleSubmit = async (e) => {
        e.preventDefault()

        console.log("Hello", projectData)

        const response = await fetch(
            `${process.env.REACT_APP_API_URL}projects/`,
            {
            method: "post",
            headers: {
                "Authorization": `Token ${localStorage.getItem('token')}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: projectData.title,
                is_open: projectData.is_open,
                description: projectData.description,
                goal: projectData.goal,
                image: projectData.image,
                location: projectData.location,
                categories: projectData.categories

            }
            ),
        }
        );

        getProjects()

        setAddProject(false)

        console.log("Bye", response)
    }

    return (
        <div>
             {
            localStorage.getItem('token') 
            && addProject == false
            && <button 
            onClick={() => setAddProject(true)}
            id="AddProject"
            >Recruit a Role</button>
            }
            <div>
                {
                addProject
                ? (
                    <div class="centre-page">
                        <Form>
                        <Form.Group className="mb-3" controlId="ControlInput">
                            <Form.Label htmlFor="IsOpen">Is open to pledges</Form.Label>
                            <Form.Select id="is_open" aria-label="Default select example"
                            onChange={handleChange}>
                                <option>{projectData.is_open}</option>
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                            </Form.Select>
                        </Form.Group>
                        
                        <Form.Group className="mb-3" controlId="ControlInput">
                            <Form.Label htmlFor="ProjectTitle">Project Title:</Form.Label>
                            <Form.Control
                                value={projectData.title}
                                type="text"
                                id="title"
                                placeholder="Title"
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label htmlFor="ProjectDescription">Project Description:</Form.Label>
                            <Form.Control
                                value={projectData.description}
                                type="text"
                                id="description"
                                placeholder="Project Description"
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="Goal">Goal:</Form.Label>
                            <Form.Control
                                value={projectData.goal}
                                type="number"
                                id="goal"
                                placeholder=""
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="Location">Location:</Form.Label>
                            <Form.Control
                                value={projectData.location}
                                type="text"
                                id="location"
                                placeholder="Location"
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="ControlInput">
                            <Form.Label htmlFor="IsOpen">ategory</Form.Label>
                            <Form.Select  id="categories"aria-label="Default select example"
                            onChange={handleChange}>
                                <option>{projectData.categories}</option>
                                <option value="Software Engineer">Software Engineer</option>
                                <option value="Senior Business Analyst">Senior Business Analyst</option>
                                <option value="Project Manager">Project Manager</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label htmlFor="Image">Image Url</Form.Label>
                            <Form.Control
                                value={projectData.image}
                                type="text"
                                id="image"
                                placeholder="Image"
                                onChange={handleChange}
                            />
                        </Form.Group>

                        <section class="container">
                            <div class="left-half">
                                <Button 
                                    variant="primary" 
                                    type="submit"
                                    onClick={handleSubmit}
                                    >Done
                                </Button>
                            </div>

                            <div class="right-half">
                                <Button 
                                    variant="primary"
                                    onClick={() => setAddProject(false)}
                                    >Cancel
                                </Button>
                            </div>
        
                        </section>

                    </Form>
                    </div>
                    
                )
                :
               <div id="center-project-cards">
                    <div id="project-list">
                        {projectList.map((projectData, key) => {
                            return <ProjectCard key={key} projectData={projectData}/>;
                        })}
                    </div>
                </div>

            }
            </div>
        </div>
        
        
    );

    
}

export default HomePage


















