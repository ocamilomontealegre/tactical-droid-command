import { inject } from "inversify";
import { controller, httpGet, httpDelete } from "inversify-express-utils";
import { AuditService } from "../services/audit.service";
import { AUDIT_ENDPOINT } from "../constants";
import { NotFoundException } from "common/exceptions";
import type { Request, Response } from "express";
import type { ObjectId } from "typeorm";

/**
 * @openapi
 * tags:
 *  name: Audit
 *  description: Manages HTTP requests and responses related to audit operations
 */
@controller(AUDIT_ENDPOINT)
export class AuditController {
  public constructor(@inject(AuditService) private readonly _auditService: AuditService) {}

  /**
   * @openapi
   * /audit:
   *   get:
   *     summary: Retrieve all audit records
   *     tags: [Audit]
   *     responses:
   *       200:
   *         description: A list of audit records
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 type: object
   */
  @httpGet("/")
  public async getAll(_: Request, res: Response): Promise<void> {
    const result = await this._auditService.getAll();
    res.json(result);
  }

  /**
   * @openapi
   * /audit/{id}:
   *   get:
   *     summary: Retrieve an audit record by ID
   *     tags: [Audit]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: The ID of the audit record to retrieve
   *     responses:
   *       200:
   *         description: The requested audit record
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   */
  @httpGet("/:id")
  public async getById(req: Request, res: Response): Promise<void> {
    const id = req.params.id as unknown as ObjectId;
    const result = await this._auditService.getById(id);
    if (result) res.json(result);
    else throw new NotFoundException("Auditory record not found!");
  }

  /**
   * @openapi
   * /audit/{id}:
   *   delete:
   *     summary: Delete an audit record by ID
   *     tags: [Audit]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *         description: The ID of the audit record to delete
   *     responses:
   *       200:
   *         description: Auditory record deleted successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   */
  @httpDelete("/:id")
  public async deleteById(req: Request, res: Response): Promise<void> {
    const result = await this._auditService.deleteById(req.params.id as unknown as ObjectId);
    if (result) res.json({ message: "Auditory record deleted successfully!" });
    else throw new NotFoundException("Auditory record not found!");
  }
}
