import React from 'react';
import PropTypes from 'prop-types';
import { Spin, Divider, Icon, Button, Row, Col } from 'antd';

import { PageLayout, Heading, MetaTags } from '@gqlapp/look-client-react';
import SuggestedListComponent from '@gqlapp/look-client-react/ui-antd/components/SuggestedListComponent';

import MyOrderItemComponent from './MyOrderItemComponent';

const ButtonGroup = Button.Group;

const MyOrdersView = props => {
  const [status, setStatus] = React.useState('');
  const { loading, orders, t, history, currentUser, orderStates, onUserStateChange } = props;

  function filterItems(e) {
    setStatus(e.toUpperCase());
    onUserStateChange(currentUser && currentUser.id, e);
  }

  function classNamesgroup(e) {
    if (status === e.toUpperCase()) {
      return 'primary';
    } else {
      return '';
    }
  }

  const NoMyOrdersMessage = () => <div align="center">{t('orders.noListingsMsg')}</div>;

  const renderFunc = (key, item) => (
    <MyOrderItemComponent key={key} item={item} history={history} currentUser={currentUser} />
  );
  const Icons = [
    <Icon type="appstore" />,
    <Icon type="hdd" />,
    <Icon type="shop" />,
    <Icon type="to-top" />,
    <Icon type="delete" />
  ];
  const RenderMyOrders = () => (
    <div>
      {loading && (
        <div align="center">
          <br />
          <br />
          <Spin size="large" />
        </div>
      )}
      {!loading && <SuggestedListComponent {...props} items={orders} renderFunc={renderFunc} />}
    </div>
  );
  console.log('props', props);
  return (
    <PageLayout>
      <MetaTags title=" MyOrders" description="" />

      <Row>
        <Col md={{ span: 10 }} sm={{ span: 7 }} xs={{ span: 24 }}>
          <Heading type="2" className="headingTop">
            <Icon type="solution" />
            &nbsp; My Orders
          </Heading>
          <br />
        </Col>
        <Col md={{ span: 14 }} sm={{ span: 17 }} xs={{ span: 24 }}>
          {orderStates && orderStates.length !== 0 && (
            <ButtonGroup className="width100">
              <Button onClick={() => filterItems('')} type={classNamesgroup('')}>
                {Icons[0]}
                ALL
              </Button>
              {orderStates.map((oS, i) => (
                <Button key={i} onClick={() => filterItems(oS.state)} type={classNamesgroup(oS.state)}>
                  {Icons[i + 1]}
                  {oS.state}
                </Button>
              ))}
            </ButtonGroup>
          )}
        </Col>
      </Row>
      <Divider />
      {orders && orders.totalCount ? <RenderMyOrders /> : <NoMyOrdersMessage />}
    </PageLayout>
  );
};

MyOrdersView.propTypes = {
  loading: PropTypes.bool,
  orders: PropTypes.object,
  history: PropTypes.object,
  currentUser: PropTypes.object,
  orderStates: PropTypes.array,
  onUserStateChange: PropTypes.func,
  t: PropTypes.func
};

export default MyOrdersView;
