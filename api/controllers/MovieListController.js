import { 
    getListByListId,
    getGroupLists,
    getListMovies, 
    createPersonalList, 
    createGroupList, 
    addMovie,
    editMovieList,
    removeMovieList,
    removeMovieFromList } from '../services/movieListService.js'

export async function getMovieList(req, res,next) {

    try {
        const list = await getListByListId(req.params.id, req.user.id);
        res.json(list);
    } catch (error) {
        next(error);
    }
}

export async function getGroupMovieLists(req, res, next) {

    try {
        const lists = await getGroupLists(req.params.id, req.user.id);
        res.json(lists);
    } catch (error) {
        next(error);
    }
}

export async function getMoviesFromMovieList(req, res, next) {

    try {
        const movies = await getListMovies(req.params.id, req.user.id);
        res.json(movies);
    } catch (error) {
        next(error);
    }
}

export async function createPersonalMovieList(req, res, next) {

    try {
        const list = await createPersonalList(req.user.id, req.body.name, req.body.description, req.body.isPublic);
        res.status(201).json({message: 'Lista luotu', list});
    } catch (error) {
        next(error);
    }
}

export async function createGroupMovieList(req, res, next) {

    try {
        const list = await createGroupList(req.params.id, req.user.id, req.body.name, req.body.description, req.body.isPublic);
        res.status(201).json({message: 'Ryhmälista luotu', list});
    } catch (error) {
        next(error);
    }
}

export async function addMovieToList(req, res, next) {

    try {
        const item = await addMovie(req.params.id, req.body.movieId, req.user.id);
        res.status(201).json({message: 'Elokuva lisätty', item});
    } catch (error) {
        next(error);
    }
}

export async function updateList(req, res, next) {

    try {
        const list = await editMovieList(req.params.id, req.user.id, req.body.name, req.body.description, req.body.isPublic);
        res.json({message: 'Lista päivitetty', list});
    } catch (error) {
        next(error);
    }
}

export async function deleteList(req, res, next) {

    try {
        await removeMovieList(req.params.id, req.user.id);
        res.json({message: 'Lista poistettu'});
    } catch (error) {
        next(error);
    }
}

export async function deleteMovieFromList(req, res,next) {

    try {
        await removeMovieFromList(req.params.id, req.params.movieId, req.user.id);
        res.json({message: 'Elokuva poistettu listalta'});
    } catch (error) {
        next(error);
    }
}
