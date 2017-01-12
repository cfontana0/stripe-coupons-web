import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getAll, openModal, closeModal, updateForm, submit, deleteCoupon } from '../actions/coupons';
import styles from '../styles/coupons.scss';
import {Modal, Button} from 'react-bootstrap';
import moment from 'moment';

class Coupons extends Component {
    componentWillMount() {
        this.props.actions.getAll();
    }
    render() {
        const couponsNodes = this.props.coupons.map(coupon => {
            return (
                <div key={coupon.id} className={styles.coupon}>
                    <div className={styles.amount}>$ { (coupon.amount_off / 100).toFixed(2) }</div>
                    <div className={styles.id}><strong>Coupon code:</strong> {coupon.id}</div>
                    <div className={styles.expiration}><strong>Valid thru:</strong> { moment.unix(coupon.redeem_by).format('dddd, MMMM Do YYYY') }</div>
                    <Button onClick={ () => this.props.actions.deleteCoupon(coupon.id) } bsStyle="danger">DELETE</Button>
                </div>
            );
        });
        return (
            <div>
                <div className={styles.top}>
                    <h1>Stripe Coupons</h1>
                    <Button bsStyle="primary" bsSize="large" onClick={this.props.actions.openModal}>Add new</Button>
                </div>
                <div className={styles.center}>
                    {couponsNodes}
                </div>

                <Modal show={this.props.showModal} onHide={this.props.actions.closeModal} className={styles.modal}>
                    <Modal.Header closeButton>
                        <Modal.Title>NEW COUPON</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <input value={this.props.form.amount_off} onChange={(e) => this.props.actions.updateForm({amount_off: e.target.value})} type="text" placeholder="Amount off" className="form-control"/>
                        <input value={this.props.form.max_redemptions} onChange={(e) => this.props.actions.updateForm({max_redemptions: e.target.value})} type="text" placeholder="Number of redemptions" className="form-control"/>
                        <input value={this.props.form.expiration_date} onChange={(e) => this.props.actions.updateForm({expiration_date: e.target.value})} type="date" placeholder="Expiration date" className="form-control"/>
                        <span>{this.props.msg}</span>
                        <Button onClick={() => this.props.actions.submit(this.props.form.amount_off, this.props.form.max_redemptions, this.props.form.expiration_date)} bsStyle="primary" bsSize="large" block>CREATE</Button>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.props.actions.closeModal} bsStyle="danger">CANCEL</Button>
                    </Modal.Footer>
                </Modal>

            </div>
        );
    }
}

Coupons.propTypes = {
    coupons: PropTypes.array,
    actions: PropTypes.object,
    showModal: PropTypes.bool,
    form: PropTypes.object,
    msg: PropTypes.string
};

const mapStateToProps = (state) => {
    return {
        coupons: state.coupons.list,
        showModal: state.coupons.showModal,
        form: state.coupons.form,
        msg: state.coupons.msg
    };
};

const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators({ getAll, openModal, closeModal, updateForm, submit, deleteCoupon }, dispatch)
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Coupons);
