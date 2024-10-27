import { Router } from "express";
import { isAuth } from "../middlewares/authMiddleware.js";
import { TITLE_CATALOG_PAGE, TITLE_CREATE_PAGE,  } from "../config/constants.js";
import planetService from "../services/planetService.js";
import { getErrorMessage } from "../utils/errorUtils.js";

const planetController = Router();

planetController.get('/create', isAuth, (req, res) => {
    res.render('planet/create', {title: TITLE_CREATE_PAGE});
});

planetController.post('/create', isAuth, async (req, res) => {
    const planetData = req.body;
    const ownerId = req.user._id;

    //console.log(deviceData);

    try{
        await planetService.create(planetData, ownerId);
        res.redirect('/planets/catalog');
    } catch (err) {
        const errorMessage = getErrorMessage(err);
        return res.render('planet/create', { error: errorMessage, planet: planetData, title: TITLE_CREATE_PAGE});
    }
});

planetController.get('/catalog', async (req, res) => {
    const planets = await planetService.getAll().lean();
    res.render('planet/catalog', { planets, title: TITLE_CATALOG_PAGE});
});

export default planetController;