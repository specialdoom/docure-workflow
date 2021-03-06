import { Request, Response } from "express";
import * as admin from 'firebase-admin'
import { handleError } from "../utils";
import * as serviceAccount from '../../credentials/docure-firebase.json';

const params = {
  type: serviceAccount.type,
  projectId: serviceAccount.project_id,
  privateKeyId: serviceAccount.private_key_id,
  privateKey: serviceAccount.private_key,
  clientEmail: serviceAccount.client_email,
  clientId: serviceAccount.client_id,
  authUri: serviceAccount.auth_uri,
  tokenUri: serviceAccount.token_uri,
  authProviderX509CertUrl: serviceAccount.auth_provider_x509_cert_url,
  clientC509CertUrl: serviceAccount.client_x509_cert_url
}

admin.initializeApp({
  credential: admin.credential.cert(params),
  databaseURL: "https://docure-9a8dd-default-rtdb.europe-west1.firebasedatabase.app"
});

const database = admin.database();

export async function all(req: Request, res: Response) {
  try {
    const workflows: any[] = [];

    (await database.ref('workflows').once("value")).forEach(item => {
      workflows.push({ id: item.key, title: item.val().title });
    });

    return res.status(200).send(workflows);
  } catch (e) {
    return handleError(res, e);
  }
}

export async function get(req: Request, res: Response) {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send({ message: 'No id provided!' });
  }

  try {
    const snapshot = await database.ref('workflows').child(id).once("value");

    return snapshot.val() ? res.status(200).send(JSON.stringify(snapshot.val())) : res.status(404).send({ message: 'Workflows not found!' });
  } catch (e) {
    return handleError(res, e);
  }
}

export async function add(req: Request, res: Response) {
  const { nodes, links, title } = req.body;

  if (!nodes || !links) {
    return res.status(400).send({ message: 'No data provided!' });
  }

  if (!title) {
    return res.status(400).send({ message: 'No title provided!' });
  }

  try {

    (await database.ref('workflows').push()).set({
      title,
      nodes: nodes,
      links: links,
      date: new Date().toString(),
    })

    return res.status(200).send({ message: 'Workflow added successfully!' });
  } catch (e) {
    return handleError(res, e);
  }
}