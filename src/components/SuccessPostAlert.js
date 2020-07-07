import React, { useState } from 'react';
import { Alert } from 'reactstrap';

const SuccessPostAlert = (props) => {
  const [visible, setVisible] = useState(true);
  const onDismiss = () => setVisible(false);

  return (
    <div>
      <Alert color="success" isOpen={visible} toggle={onDismiss}>
        <h4 className="alert-heading">Congratulations!</h4>
        <p>
          You successfully posted and anonymous message!  To keep the forum on topic, all posts must be approved before being posted publicly.  Check back soon to see Fern's answer!
        </p>
      </Alert>
    </div>
  );
};

export default SuccessPostAlert;