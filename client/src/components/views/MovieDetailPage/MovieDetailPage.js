import React, {useEffect, useState} from 'react'
import { Button, Descriptions, Row } from 'antd';
import axios from 'axios';

import Comments from './Sections/Comments';
import LikeDislikes from './Sections/LikeDislikes';
import { API_URL, API_KEY, IMAGE_URL, IMAGE_SIZE, POSTER_SIZE } from '../../Config';
import GridCards from '../../commons/GridCards';
import MainImage from '../LandingPage/Sections/MainImage';

import Favorite from './Sections/Favorite';

function MovieDetailPage(props) {

    const movieId = props.match.params.movieId;
    const [Movie, setMovie] = useState([]);
    const [crews, setCrews] = useState([]);
    const [CommentLists, setCommentLists] = useState([]);
    const [ActorToggle, setActorToggle] = useState(false);
    const movieVariable = {
        movieId: movieId
    }

    useEffect(() => {


        axios.post('/api/comment/getComments', movieVariable)
            .then(response => {
                console.log(response)
                if (response.data.success) {
                    console.log('response.data.comments', response.data.comments)
                    setCommentLists(response.data.comments)
                } else {
                    alert('Failed to get comments Info')
                }
            })

        
        fetch(`${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`)
        .then((response) => response.json())
        .then(response => {
            console.log(response);
            setMovie(response);

            fetch(`${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`)
            .then((response) => response.json())
            .then(response => {
                setCrews(response.cast);
            })

        })

    }, [])

    const handleClick = () => {
        setActorToggle(!ActorToggle)
    }

    const updateComment = (newComment) => {
        setCommentLists(CommentLists.concat(newComment))
    }

    return (
        <div>
            {/* Image of the movie */}
            {Movie &&
                <MainImage
                    image={`${IMAGE_URL}${IMAGE_SIZE}${Movie.backdrop_path}`}
                    title={Movie.original_title}
                    text={Movie.overview}
                />
            }

            {/* {Body} */}
            <div style={{width:'85%', margin: '1rem auto'}}>
                <div style={{display:'flex', justifyContent: 'flex-end'}}>
                    <Favorite userFrom={localStorage.getItem('userId')} movieId={movieId} movieInfo={Movie} />
                </div>    

                {/* Movie Data Table */}
                <Descriptions title='Movie Info' bordered>
                    <Descriptions.Item label ="Title">{Movie.original_title}</Descriptions.Item>
                    <Descriptions.Item label ="release_date">{Movie.release_date}</Descriptions.Item>
                    <Descriptions.Item label ="revenue">{Movie.revenue}</Descriptions.Item>
                    <Descriptions.Item label ="runtime">{Movie.runtime}</Descriptions.Item>
                    <Descriptions.Item label ="vote_average">{Movie.vote_average}</Descriptions.Item>
                    <Descriptions.Item label ="vote_count">{Movie.vote_count}</Descriptions.Item>
                    <Descriptions.Item label ="status">{Movie.status}</Descriptions.Item>
                    <Descriptions.Item label ="popularity">{Movie.popularity}</Descriptions.Item>
                </Descriptions>

                <br/><br/>
                <div style={{display:'flex', justifyContent: 'center'}}>
                    <Button onClick={handleClick}> Toggle Actor View </Button></div>
                <br/>

                {/* Grid Card for Crew Members */}

                {ActorToggle && 
                    <Row gutter={[16, 16]}>
                    {crews && crews.map((crew, index) => (
                        <React.Fragment key={index}>
                            {crew.profile_path && <GridCards
                            actor image = {`${IMAGE_URL}w500${crew.profile_path}`}
                            />}
                            
                        </React.Fragment>
                    ))}
                </Row>
                }
                 <br />
                
                 <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <LikeDislikes video videoId={movieId} userId={localStorage.getItem('userId')} />
                </div>

                {/* Comments */}
                <Comments movieTitle={Movie.original_title} CommentLists={CommentLists} postId={movieId} refreshFunction={updateComment} />
                
            </div>

        </div>
    )
}

export default MovieDetailPage
