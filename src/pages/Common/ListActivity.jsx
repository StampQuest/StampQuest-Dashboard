import React, { useEffect } from 'react';
import { useCategories, useGetCategoriesList } from '../../stores/useCategoriesStore.js';
import { Card, CardBody } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { useActivity, useGetListActivity } from '../../stores/useActivityList.js';

const ListActivity = () => {

  const getCategoriesList = useGetCategoriesList();
  const categoriesList = useCategories();
  const navigate = useNavigate();
  const getActivityList = useGetListActivity();
  const activityList = useActivity();

  useEffect(() => {
    getCategoriesList();
    getActivityList();
  }, []);

  console.log(categoriesList, activityList);

  return (
    <div className="container">
      <div className="row mb-5">
        <h3>Categories</h3>
        {categoriesList.map((category) => (
          <Card key={category.id} className="p-0 me-3 " style={{
            height: '96px',
            width: '96px',
            background: `url(${category.image_url})`,
            backgroundSize: 'cover',
          }}
                onClick={() => navigate(`/categories/${category.hashId}`)}>
            <CardBody className="d-flex justify-content-start align-items-end text-white p-2 "
                      style={{
                        fontWeight: 'bold',
                        background: 'linear-gradient(0deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.33) 100%)',
                      }}>
              {category.name}
            </CardBody>
          </Card>
        ))}
      </div>
      <div>
        <h3>Activités Populaires</h3>
        {activityList.map((activity) => (
          <Card key={activity.id} className="p-0 me-3 " style={{
            height: '256px',
            width: '192px',
            background: `url(${activity.image_url})`,
            backgroundSize: 'cover',
          }}
                onClick={() => navigate(`/activities/${activity.hashId}`)}>
            <CardBody className="d-flex justify-content-start align-items-end text-white p-2 "
                      style={{
                        fontWeight: 'bold',
                        background: 'linear-gradient(0deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.33) 100%)',
                      }}>
              {activity.name}
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ListActivity;
