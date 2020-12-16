import {Action} from "redux";
import {AxiosError} from "axios";
import {ReactNode} from "react";

export interface CategoryState {
    categoryList: Category[] | null,
    selectedCategory: Category | null,
    isLoading: {
        list: boolean,
        add: boolean,
        update: boolean,
        delete: boolean,
    },
    isEditMode: boolean,
    isHomePage: boolean,
    isContentVisible: boolean,
    previewCard: {
        photo: File | null,
        previewUrl: string | null,
        previewTitle: string
    },
    isDeleteDialogVisible: boolean,
    isSuccessMessageVisible: boolean,
    errors: AxiosError | null,
};

export interface Category {
    _id: string,
    name: string,
    photo: {
        contentType: string,
        data: {
            type: string,
            data: number[],
        },
        originalName: string,
        size: number,
    }
};

export interface AddCategory extends Action {
    payload: {
        name: string,
        photo: File,
    }
};

export interface UpdateCategory extends Action {
    payload: {
        _id: string,
        name?: string,
        photo?: File,
    }
};

export interface QueryAddCategory {
    name: string,
    photo: File,
};

export interface QueryUpdateCategory {
    name?: string,
    photo?: File,
};

export interface DeleteCategory extends Action {
    payload: string
};

export interface PreviewCard {
    photo?: string,
    previewUrl?: string | ArrayBuffer | null,
    previewTitle?: string,
};

export interface CategoryFormValues {
    name: string,
    photo: File | null,
};

export interface CategoryFormProps {
    formProps: {
        isValid?: boolean
    },
};

export interface ImageHolderTypes {
    children: ReactNode,
    className: string,
};

