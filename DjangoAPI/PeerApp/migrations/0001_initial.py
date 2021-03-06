# Generated by Django 3.1.6 on 2021-02-22 10:32

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='PeerDatas',
            fields=[
                ('PeerDataId', models.CharField(max_length=100, primary_key=True, serialize=False)),
                ('Id', models.IntegerField()),
                ('Peer', models.CharField(max_length=100)),
                ('Data', models.CharField(max_length=100)),
                ('TxHash', models.CharField(max_length=100)),
                ('UpdatedTxHash', models.CharField(max_length=100)),
                ('Deleted', models.BooleanField()),
            ],
        ),
        migrations.CreateModel(
            name='Peers',
            fields=[
                ('PeerName', models.CharField(max_length=100, primary_key=True, serialize=False)),
                ('Color', models.CharField(max_length=100)),
            ],
        ),
    ]
