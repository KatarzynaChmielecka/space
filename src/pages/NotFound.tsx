import Modal from '../components/Modal';

const NotFound = () => {
  return (
    <Modal
      title="Something went wrong"
      content="Page not found."
      modalOnClick={false}
      showModal={true}
      notFound={true}
    />
  );
};
export default NotFound;
