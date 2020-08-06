import db from "../database/connection";
import {convertHoursToMinutes} from "../utils/convertHoursToMinutes";
import {Request, Response} from "express";

interface ScheduleItem {
    week_day: string;
    from: string;
    to: string;
}

export class ClassesController {
    async create(req: Request, res: Response) {
        const {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost,
            schedule
        } = req.body;

        const trx = await db.transaction();

        const [user_id] = await trx('users').insert({
            name,
            avatar,
            whatsapp,
            bio,
        });

        try {
            const [class_id] = await trx('classes').insert({
                subject,
                cost,
                user_id
            });

            const classSchedule = schedule.map((item: ScheduleItem) => {
                return {
                    class_id,
                    week_day: item.week_day,
                    from: convertHoursToMinutes(item.from),
                    to: convertHoursToMinutes(item.to),
                }
            });

            await trx('class_schedule').insert(classSchedule);

            await trx.commit();

            return res.send([])
        } catch (err) {
            await trx.rollback();

            return res.status(400).send({
                error: 'Unexpected error while creating class'
            });
        }
    }

    async index(req: Request, res: Response) {
        const filters = req.query;

        if (!filters.week_day || !filters.subject || !filters.time) {
            return res.status(400).json({
                error: 'Missing filters to search classes'
            })
        }

        const subject = filters.subject as string;
        const week_day = filters.week_day as string;
        const time = filters.time as string;

        const timeInMinutes = convertHoursToMinutes(time);

        const classes = await db('classes')
            .whereExists(function () {
                this.select('class_schedule.*')
                    .from("class_schedule")
                    .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
                    .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])
                    .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
                    .whereRaw('`class_schedule`.`to` >= ??', [timeInMinutes])
            })
            .where('classes.subject', '=', subject)
            .join('users', 'classes.user_id', '=', 'users.id')
            .select(['classes.*', 'users.*'])

        return res.json(classes);
    }
}
