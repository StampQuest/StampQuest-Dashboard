import React, { useCallback, useEffect, useState } from 'react';
import { Edit, Trash } from 'lucide-react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { useCategories, useCreateCategory, useGetCategoriesList } from '../../stores/useCategoriesStore.js';
import { Controller, useForm } from 'react-hook-form';

const Categories = () => {
  const [categoriesModalOpen, setCategoriesModalOpen] = useState(false);
  const createCategory = useCreateCategory();
  const getCategoriesList = useGetCategoriesList();
  const listCategories = useCategories();
  const { control, getValues, setValue } = useForm();

  useEffect(() => {
    getCategoriesList();
  }, [getCategoriesList]);

  const handleCategoriesModalOpen = useCallback(() => {
    setCategoriesModalOpen(!categoriesModalOpen);
  }, [categoriesModalOpen]);

  const handleCreateCategory = useCallback(() => {
    const { categories } = getValues();
    handleCategoriesModalOpen();
    createCategory(categories.name, categories.image);
    setValue('categories.name', '');
    setValue('categories.image', '');
  }, [createCategory, handleCategoriesModalOpen]);


  return (
    <>
      <Modal isOpen={categoriesModalOpen} toggle={handleCategoriesModalOpen} centered>
        <ModalHeader toggle={handleCategoriesModalOpen}>Créer une catégorie</ModalHeader>
        {/*i want use react-hook-form*/}
        <ModalBody>
          <form>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">Nom de la catégorie</label>
              <Controller
                name="categories.name"
                control={control}
                render={({ field }) => (
                  <input type="text" className="form-control" id="exampleFormControlInput1"
                         placeholder="Nom de la catégorie" {...field} />
                )}
              />

            </div>
            <div className="mb-3">
              <label htmlFor="exampleFormControlTextarea1" className="form-label">Url de l'image</label>
              <Controller
                name="categories.image"
                control={control}
                render={({ field }) => (
                  <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" {...field} />
                )}
              />
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <button type="button" className="btn btn-secondary" onClick={handleCategoriesModalOpen}>
            Annuler
          </button>
          <button type="button" className="btn btn-primary" onClick={handleCreateCategory}>
            Créer
          </button>
        </ModalFooter>
      </Modal>

      <div className="container mt-5">
        <div className="d-flex justify-content-between align-items-center">
          <h3>Categories</h3>
          <div className="d-flex justify-content-end">
            <button className="btn btn-primary" onClick={handleCategoriesModalOpen}>
              <Edit className="me-2" />
              Créer une catégorie
            </button>
          </div>
        </div>

        <div>
          <table className="table table-striped">
            <thead>
            <tr>
              <th>Image</th>
              <th>Nom</th>
              <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {listCategories.map((category) => (
              <tr key={category.id}>
                <td style={{
                  backgroundImage: `url(${category.image_url})`,
                  backgroundSize: 'cover',
                  height: '32px',
                  width: '32px',
                }}></td>
                <td>{category.name}</td>
                <td>
                  <Button color="primary" className="me-2 disabled">
                    <Edit />
                  </Button>
                  <Button className="btn btn-danger disabled">
                    <Trash />
                  </Button>
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );

};

export default Categories;
