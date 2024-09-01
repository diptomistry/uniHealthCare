import React, { Fragment } from 'react';
import { Image, Text, View } from '@react-pdf/renderer';
import logo from '../../assets/img/dumc.png';

export const reciept_data = {
    "id": "642be0b4bbe5d71a5341dfb1",
    "invoice_no": "20200669",
    "address": "739 Porter Avenue, Cade, Missouri, 1134",
    "date": "24-09-2019",
    "items": [
        {
            "id": 1,
            "desc": "do ex anim quis velit excepteur non",
            "qty": 8,
            "price": 179.25
        },
        {
            "id": 2,
            "desc": "incididunt cillum fugiat aliqua Lorem sit Lorem",
            "qty": 9,
            "price": 107.78
        },
        {
            "id": 3,
            "desc": "quis Lorem ad laboris proident aliqua laborum",
            "qty": 4,
            "price": 181.62
        },
        {
            "id": 4,
            "desc": "exercitation non do eu ea ullamco cillum",
            "qty": 4,
            "price": 604.55
        },
        {
            "id": 5,
            "desc": "ea nisi non excepteur irure Lorem voluptate",
            "qty": 6,
            "price": 687.08
        }
    ]
};

export const InvoiceTitle = ({ styles }) => (
    <View style={styles.titleContainer}>
        <View style={styles.spaceBetween}>
            <Image style={styles.logo} src={logo} />
            <Text style={styles.reportTitle}>Xpress Enterprises</Text>
        </View>
    </View>
);

export const Address = ({ styles }) => (
    <View style={styles.titleContainer}>
        <View style={styles.spaceBetween}>
            <View>
                <Text style={styles.invoice}>Invoice </Text>
                <Text style={styles.invoiceNumber}>Invoice number: {reciept_data.invoice_no} </Text>
            </View>
            <View>
                <Text style={styles.addressTitle}>7, Ademola Odede, </Text>
                <Text style={styles.addressTitle}>Ikeja,</Text>
                <Text style={styles.addressTitle}>Lagos, Nigeria.</Text>
            </View>
        </View>
    </View>
);

export const UserAddress = ({ styles }) => (
    <View style={styles.titleContainer}>
        <View style={styles.spaceBetween}>
            <View style={{ maxWidth: 200 }}>
                <Text style={styles.addressTitle}>Bill to </Text>
                <Text style={styles.address}>
                    {reciept_data.address}
                </Text>
            </View>
            <Text style={styles.addressTitle}>{reciept_data.date}</Text>
        </View>
    </View>
);

export const TableHead = ({ styles }) => (
    <View style={{ width: '100%', flexDirection: 'row', marginTop: 10 }}>
        <View style={[styles.theader, styles.theader2]}>
            <Text>Items</Text>
        </View>
        <View style={styles.theader}>
            <Text>Price</Text>
        </View>
        <View style={styles.theader}>
            <Text>Qty</Text>
        </View>
        <View style={styles.theader}>
            <Text>Amount</Text>
        </View>
    </View>
);

export const TableBody = ({ styles }) => (
    reciept_data.items.map((receipt) => (
        <Fragment key={receipt.id}>
            <View style={{ width: '100%', flexDirection: 'row' }}>
                <View style={[styles.tbody, styles.tbody2]}>
                    <Text>{receipt.desc}</Text>
                </View>
                <View style={styles.tbody}>
                    <Text>{receipt.price}</Text>
                </View>
                <View style={styles.tbody}>
                    <Text>{receipt.qty}</Text>
                </View>
                <View style={styles.tbody}>
                    <Text>{(receipt.price * receipt.qty).toFixed(2)}</Text>
                </View>
            </View>
        </Fragment>
    ))
);

export const TableTotal = ({ styles }) => (
    <View style={{ width: '100%', flexDirection: 'row' }}>
        <View style={styles.total}>
            <Text></Text>
        </View>
        <View style={styles.total}>
            <Text> </Text>
        </View>
        <View style={styles.tbody}>
            <Text>Total</Text>
        </View>
        <View style={styles.tbody}>
            <Text>
                {reciept_data.items.reduce((sum, item) => sum + (item.price * item.qty), 0)}
            </Text>
        </View>
    </View>
);
