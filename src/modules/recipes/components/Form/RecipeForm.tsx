import React, { BaseSyntheticEvent, SyntheticEvent, useEffect, useRef } from 'react';
import '../../styles.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Button, DropdownProps, Form, Header, TextArea } from 'semantic-ui-react';
import BtnSection from '../BtnSection/BtnSection';
import { getCategoryList } from '../../../categories/selectors';
import { isEmpty } from 'lodash';
import { fetchCategories } from '../../../categories/actions';
import IngredientForm from '../../../ingredients/components/Form/IngredientForm';
import IngredientHeading from '../../../ingredients/components/Heading/IngredientHeading';

const RecipeForm = (props: any) => {
    const dispatch = useDispatch();
    const categoryList = useSelector(getCategoryList);

    const categoryOptions =
        categoryList && !isEmpty(categoryList)
            ? categoryList.map((item) => ({
                  id: item._id,
                  key: item._id,
                  text: item.name,
                  value: item._id,
              }))
            : [
                  {
                      id: 0,
                      key: 0,
                      text: 'Add a category before creating a recipe',
                      value: '',
                  },
              ];

    const {
        values: { name, categoryId, photo, directions },
        errors,
        touched,
        handleSubmit,
        handleChange,
        setFieldValue,
        submitIngredients,
    } = props;

    useEffect(() => {
        if (!categoryList) {
            dispatch(fetchCategories());
        }
    }, []);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const fileChange = (e: BaseSyntheticEvent) => {
        e.preventDefault();

        setFieldValue('photo', e.currentTarget.files[0]);
    };

    const handleClick = () => {
        const { current } = fileInputRef;

        current && current.click();
    };

    const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        handleSubmit(e);
    };

    const handleInputChange = (e: BaseSyntheticEvent) => {
        e.preventDefault();

        handleChange(e);
    };

    const handleSelectChange = (e: SyntheticEvent<HTMLElement, Event>, { name, value }: DropdownProps) => {
        setFieldValue(name, value);
    };

    return (
        <Form size="large" className="form-holder" onSubmit={handleOnSubmit} fluid>
            <Form.Group widths="equal">
                <Form.Input
                    id="recipe-name-input"
                    name="name"
                    label="Recipe name"
                    placeholder="Recipe name"
                    value={name}
                    onChange={handleInputChange}
                    error={touched.name && errors.name}
                    fluid
                />

                <Form.Select
                    fluid
                    id="recipe-select-category"
                    name="categoryId"
                    label="Category"
                    options={categoryOptions}
                    value={categoryId}
                    onChange={handleSelectChange}
                    error={touched.categoryId && errors.categoryId}
                    placeholder="Choose a category"
                />
            </Form.Group>

            <div className="photo-btn">
                <Form.Field>
                    <Button
                        id="recipe-photo-btn"
                        content="Choose Photo"
                        labelPosition="left"
                        icon="file"
                        type="button"
                        onClick={handleClick}
                    />
                    <input
                        id="recipe-photo-input"
                        ref={fileInputRef}
                        name="photo"
                        type="file"
                        hidden
                        onChange={fileChange}
                    />

                    {photo && photo.name && <div className="label-text">{photo.name}</div>}

                    {touched.photo && errors.photo && <div className="error-text">{errors.photo}</div>}
                </Form.Field>
            </div>

            <IngredientHeading />

            <IngredientForm onSubmit={submitIngredients} />

            <Header as="h3" className="primary-text">
                Directions
            </Header>

            <TextArea
                id="recipe-directions"
                name="directions"
                value={directions}
                onChange={handleInputChange}
                error={touched.directions && errors.directions}
                fluid
                rows={8}
                placeholder="Write your recipe here..."
            />

            <BtnSection formProps={props} />
        </Form>
    );
};

export default RecipeForm;