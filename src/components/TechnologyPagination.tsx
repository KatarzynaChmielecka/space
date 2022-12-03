import classes from './TechnologyPagination.module.css';

const TechnologyPagination = ({
  onClick,
  page,
  isActivePage,
}: {
  onClick: (indicatorId: string) => void;
  page: number;
  isActivePage: boolean;
}) => {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => {
        onClick(page.toString());
      }}
      onKeyPress={() => {
        onClick(page.toString());
      }}
      className={
        isActivePage
          ? `${classes.active} ${classes.inactive}`
          : classes.inactive
      }
    >
      {page + 1}
    </div>
  );
};

export default TechnologyPagination;
