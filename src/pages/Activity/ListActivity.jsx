import React, { useCallback, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, Input, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { Edit, Trash } from 'lucide-react';
import { useCategories, useGetCategoriesList } from '../../stores/useCategoriesStore.js';
import { useActivity, useCreateActivity, useGetListActivity } from '../../stores/useActivityList.js';


const ListActivity = () => {
  const [activitiesModalOpen, setActivitiesModalOpen] = useState(false);
  const createActivity = useCreateActivity();
  const getActivtyList = useGetListActivity();
  const getCategoriesList = useGetCategoriesList();
  const categoriesList = useCategories();
  const activityList = useActivity();
  const { control, getValues, setValue } = useForm();

  useEffect(() => {
    getActivtyList();
    getCategoriesList();
  }, [getActivtyList]);

  const handleActivitiesModalOpen = useCallback(() => {
    setActivitiesModalOpen(!activitiesModalOpen);
  }, [activitiesModalOpen]);

  const handleCreateActivity = useCallback(() => {
    const { activity } = getValues();
    handleActivitiesModalOpen();
    createActivity(activity.name, activity.description, activity.category);
  }, [createActivity, handleActivitiesModalOpen]);


  return (
    <>
      <Modal isOpen={activitiesModalOpen} toggle={handleActivitiesModalOpen} centered>
        <ModalHeader toggle={handleActivitiesModalOpen}>Créer une catégorie</ModalHeader>
        <ModalBody>
          <form>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">Nom de la catégorie</label>
              <Controller
                name="activity.name"
                control={control}
                render={({ field }) => (
                  <input type="text" className="form-control" id="exampleFormControlInput1"
                         placeholder="Nom de la catégorie" {...field} />
                )}
              />

            </div>
            <div className="mb-3">
              <label htmlFor="exampleFormControlTextarea1" className="form-label">Description de l'activité</label>
              <Controller
                name="activity.description"
                control={control}
                render={({ field }) => (
                  <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" {...field} />
                )}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleFormControlTextarea1" className="form-label">Catégorie de l'activité</label>
              <Controller
                name="activity.category"
                control={control}
                render={({ field }) => (
                  <Input type="select" name="categories" id="categories" {...field} >
                    {categoriesList.map((category) => (
                      <option key={category.hashId} value={category.hashId}>{category.name}</option>
                    ))}
                  </Input>
                )}
              />
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
          <button type="button" className="btn btn-secondary" onClick={handleActivitiesModalOpen}>
            Annuler
          </button>
          <button type="button" className="btn btn-primary" onClick={handleCreateActivity}>
            Créer
          </button>
        </ModalFooter>
      </Modal>

      <div className="container mt-5">
        <div className="d-flex justify-content-between align-items-center">
          <h3>Categories</h3>
          <div className="d-flex justify-content-end">
            <button className="btn btn-primary" onClick={handleActivitiesModalOpen}>
              <Edit className="me-2" />
              Créer une catégorie
            </button>
          </div>
        </div>

        <div>
          <table className="table table-striped">
            <thead>
            <tr>
              <th>Nom</th>
              <th>Description</th>
              <th>Catégorie</th>
              <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {activityList.map((activity) => (
              <tr key={activity.hashId}>
                <td>{activity.name}</td>
                <td>{activity.short_description}</td>
                <td>{activity.categories.name}</td>
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

export default ListActivity;
