import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Container, Grow, Grid, Typography } from '@material-ui/core'
import { getPosts } from '../../actions/posts-actions'

import { useNavigate, useLocation } from 'react-router-dom'

import useStyles from './styles'

function useQuery() {
    return new URLSearchParams(useLocation().search)
}

const Home = () => {

    const classes = useStyles()
    const dispatch = useDispatch()
    const query = useQuery()
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getPosts())
    }, [dispatch])

    return (
        <Grow in>
            <Container maxWidth="xl">
                <Grid className={classes.mainContainer} container justifyContent="space-between" alignItems="stretch" spacing={3}>
                    <Typography className={classes.dashboard} variant='h5'>Dashboard Coming Soon!</Typography>
                </Grid>
            </Container>
        </Grow>
    )
}

export default Home