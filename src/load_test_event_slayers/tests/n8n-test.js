import http from 'k6/http';

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

export default function () {
  const url = 'http://reservation-worker-svc.dx.svc.cluster.local:3000/worker/v1/workflow/user-speech';
  const payload = JSON.stringify({    
  	chatbot_id: '3589',
  	custom_form_id: '960',
  	event_type: '10',
  	end_user_page_id: '4882',
 	 not_in_user_speech: [
   		 'マイカー登録',
   	 'ラクラク入庫予約',
   	 'オンライン査定',
   	 'ラクラク入庫予約（お盆休暇ver）',
    	'くまるとチャットする',
    	'アンケートに回答する',
    	'お知らせアンケートに回答',
    	'らくらく入庫予約'
  	],
  	name_custom_form_question_id: '24835',
  	phone_custom_form_question_id: '24836',
  	vehicle_custom_form_question_id: '24837',
  	license_custom_form_question_id: '24838',
  	from_mail: 'zeals@zeals.co.jp',
  	to_mail: [
    		'mahesh.dilhan@zeals.co.jp',
  	],
  	cc_mail: [
    		'mahesh.dilhan@zeals.co.jp',
  	],
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  http.post(url, payload, params);
}
