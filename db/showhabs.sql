select date,is_on,is_complete,habit_name from user_habit_day left join 
user_habit on user_habit_id=user_habit.id 
left join habit on habit_id=habit.id;