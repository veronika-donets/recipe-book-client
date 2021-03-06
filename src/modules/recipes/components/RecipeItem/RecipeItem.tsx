import React, { BaseSyntheticEvent, useState } from 'react';
import '../../styles.scss';

import { Button, Divider, Grid, Header, Placeholder } from 'semantic-ui-react';
import { recipePhotoUrl } from '../../../../backend/constants';
import { Recipe, RecipeItemTypes } from '../../types';
import { useDispatch, useSelector } from 'react-redux';
import { getUserId } from '../../../auth/selectors';
import { setDeleteDialogIsVisible, setEditMode, setSelectedRecipe } from '../../actions';
import useReactRouter from 'use-react-router';
import { fillIngredientsList } from '../../../ingredients/actions';
import DefaultImage from '../../../../assets/default-image.png';

const RecipeItem = ({ item, showDivider }: RecipeItemTypes) => {
    const dispatch = useDispatch();

    const [isShowLoadImg, setIsShowLoadImg] = useState(true);

    const { history } = useReactRouter();

    const userId = useSelector(getUserId);

    const handleOnError = (e: BaseSyntheticEvent) => {
        e.target.src = DefaultImage;
        e.target.error = null;
    };

    const handleOnLoad = () => {
        setIsShowLoadImg(false);
    };

    const handleOnUpdate = (item: Recipe) => {
        dispatch(setSelectedRecipe(item._id));
        dispatch(setEditMode(true));
        dispatch(fillIngredientsList(item.ingredients));
        history.push('/recipes');
    };

    const handleOnDelete = (id: string) => {
        dispatch(setSelectedRecipe(id));
        dispatch(setDeleteDialogIsVisible(true));
    };

    const handleOnClick = () => {
        history.push(`/recipes/${item.categoryId}/${item._id}`);
    };

    const handleShowMore = () => {
        history.push(`/recipes/${item.categoryId}/${item._id}`);
    };

    return (
        <Grid key={item._id} textAlign="center">
            <Grid.Row>
                <Header as="a" onClick={handleShowMore} className="headerHolder">
                    {item.name}
                </Header>
            </Grid.Row>

            <Grid.Row className="directions-holder">
                <Grid.Column className="recipe-img-holder recipe-item" onClick={handleOnClick}>
                    {isShowLoadImg && (
                        <Placeholder className="placeholder-recipe">
                            <Placeholder.Image square />
                        </Placeholder>
                    )}

                    <img
                        src={recipePhotoUrl + item._id + '/' + item.updatedAt}
                        alt={item.name}
                        onError={handleOnError}
                        onLoad={handleOnLoad}
                        className="recipe-img"
                    />
                </Grid.Column>

                <Grid.Column width={11} textAlign="justified" className="recipe-directions">
                    <Grid.Row className="directions-content">{item.directions}</Grid.Row>

                    <Grid.Row as="a" onClick={handleShowMore} className="directions-more">
                        Read more...
                    </Grid.Row>

                    {item.userId === userId && (
                        <Grid.Row className="directions-btns">
                            <Button icon="pencil" onClick={() => handleOnUpdate(item)} />
                            <Button icon="trash alternate" onClick={() => handleOnDelete(item._id)} />
                        </Grid.Row>
                    )}
                </Grid.Column>
            </Grid.Row>

            {showDivider && <Divider />}
        </Grid>
    );
};

export default RecipeItem;
