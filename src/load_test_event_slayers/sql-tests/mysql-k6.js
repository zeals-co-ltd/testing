import sql from 'k6/x/sql';

// The second argument is a MySQL connection string, e.g.
// myuser:mypass@tcp(127.0.0.1:3306)/mydb
const db = sql.open('mysql', 'readonly:fPUeLUfjNCCf7pJE@tcp(192.168.208.2:3306)/fanp');


export const options = {
  discardResponseBodies: true,
  scenarios: {
    contacts: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '5s', target: 70 },
        { duration: '5s', target: 120 },
        { duration: '10s', target: 0 },
      ],
      gracefulRampDown: '0s',
    },
  },
};

export function setup() {

}

export function teardown() {
  db.close();
}

export default function () {
let sqlstr = `SELECT
  end_user_event_logs.id,
  end_users.id as end_user_id,
  line_users.first_name,
  end_user_event_logs.user_speech,
  kind_car.text_field AS kind_car,
  num_car.text_field AS num_car,
  phone.text_field AS phone,
  user_name.text_field AS user_name,
  DATE_FORMAT(
    end_user_event_logs.evented_at,
    '%Y年%m月%d日 %H:%m'
  ) AS evented_at
FROM
  end_user_event_logs
  INNER JOIN end_users ON end_users.id = end_user_event_logs.end_user_id
  INNER JOIN line_users ON line_users.id = end_users.line_user_id
  LEFT OUTER JOIN custom_form_answers AS kind_car ON kind_car.end_user_id = end_user_event_logs.end_user_id
  AND kind_car.custom_form_question_id = 24837
  LEFT OUTER JOIN custom_form_answers AS num_car ON num_car.end_user_id = end_user_event_logs.end_user_id
  AND num_car.custom_form_question_id = 24838
  LEFT OUTER JOIN custom_form_answers AS user_name ON user_name.end_user_id = end_user_event_logs.end_user_id
  AND user_name.custom_form_question_id = 24835
  LEFT OUTER JOIN custom_form_answers AS phone ON phone.end_user_id = end_user_event_logs.end_user_id
  AND phone.custom_form_question_id = 24836
WHERE
  end_users.page_id = 4882
  AND end_users.active = true
  AND end_user_event_logs.event_type = 10
  AND end_user_event_logs.evented_at BETWEEN TIMESTAMP(
    DATE(
      CONVERT_TZ(NOW(), 'UTC', 'Asia/Tokyo')
    )
  )
  AND ADDTIME(
    TIMESTAMP(
      DATE(
        CONVERT_TZ(NOW(), 'UTC', 'Asia/Tokyo')
      )
    ),
    '23:59:59'
  )
  AND NOW() + INTERVAL 9 HOUR
  AND end_user_event_logs.user_speech != 'マイカー登録'
  AND end_user_event_logs.user_speech != '点検の予約'
  AND end_user_event_logs.user_speech != 'このLINEの使い方'
  AND end_user_event_logs.user_speech NOT IN(
    SELECT
      custom_form_answers.text_field
    FROM
      custom_form_answers
      INNER JOIN custom_form_questions ON custom_form_questions.id = custom_form_answers.custom_form_question_id
      INNER JOIN custom_form_question_groups ON custom_form_question_groups.id = custom_form_questions.custom_form_question_group_id
    WHERE
      custom_form_question_groups.custom_form_id = 960
  )`;

let results = sql.query(db,sqlstr);
console.log(results) ;
}
